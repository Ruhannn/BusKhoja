import json
from google import genai
from app.db.client import DB

db = DB()
client = genai.Client()

def extract_locations_ai(query: str):
    """Ask Gemini to find source and destination locations in the user query."""
    prompt = f"""
    You are a JSON API. Extract the travel intent from this query.
    Output ONLY valid JSON with two string fields: "from" and "to".

    Example:
    Input: "I want to go from Dhaka to Chittagong"
    Output: {{"from": "Dhaka", "to": "Chittagong"}}

    Now process:
    "{query}"
    """
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={"response_mime_type": "application/json"}
        )
        text = response.text.strip()
        data = json.loads(text)
        return data.get("from"), data.get("to")
    except Exception as e:
        print("Gemini parse error:", e)
        return None, None


def fetch_routes(from_loc, to_loc):
    try:
        query = """
            SELECT r.id AS route_id, r.price,
                   l1.name AS from_name, l2.name AS to_name,
                   COALESCE(json_agg(json_build_object(
                       'id', b.id,
                       'name', b.name,
                       'picture', b.picture
                   )) FILTER (WHERE b.id IS NOT NULL), '[]') AS buses
            FROM route r
            JOIN location l1 ON r.from_id = l1.id
            JOIN location l2 ON r.to_id = l2.id
            LEFT JOIN bus b ON r.id = ANY(b.route_ids)
            WHERE l1.name ILIKE %s AND l2.name ILIKE %s
            GROUP BY r.id, r.price, l1.name, l2.name;
        """
        rows = db.all(query, (from_loc, to_loc))
        for r in rows:
            if isinstance(r["buses"], str):
                r["buses"] = json.loads(r["buses"])
        return rows
    except Exception as e:
        print("DB fetch error:", e)
        return []


def generate_ai_response(routes_data, from_loc, to_loc):
    """Generate natural response using Gemini AI."""
    try:
        if not routes_data:
            return f"Sorry, no routes found from {from_loc} to {to_loc}."

        routes_text = "\n".join(
            f"- Bus {b['name']} costs {r['price']}" for r in routes_data for b in r['buses']
        )

        prompt = f"User wants to travel from {from_loc} to {to_loc}. Suggest bus options in a friendly way:\n{routes_text}"

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text.strip()
    except Exception as e:
        print("Gemini AI response error:", e)
        return f"Sorry, something went wrong while generating bus suggestions."


def handle_ai_routes(app):
    @app.options("/suggest-route")
    def route(req):
        req.send(204, "")

    @app.post("/suggest-route")
    def suggest_route(req):
        try:
            body = req.json()
            user_query = body.get("query", "")
            if not user_query:
                return req.send(200, {"response": "Please provide a query."})

            from_loc, to_loc = extract_locations_ai(user_query)
            if not from_loc or not to_loc:
                return req.send(200, {"response": "Could not extract locations from your query."})

            routes = fetch_routes(from_loc, to_loc)
            ai_text = generate_ai_response(routes, from_loc, to_loc)

            return req.send(200, {"response": ai_text})
        except Exception as e:
            print("Unexpected error:", e)
            return req.send(200, {"response": "Sorry, an unexpected error occurred."})
