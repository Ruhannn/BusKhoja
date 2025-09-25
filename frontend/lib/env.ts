// import { z } from "zod";

// const EnvSchema = z.object({
//   NODE_ENV: z.string().default("development"),
//   BASE_URL: z.url(),
//   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
//   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().min(1),
// });

// export type env = z.infer<typeof EnvSchema>;

// // eslint-disable-next-line node/no-process-env
// const { data: env, error } = EnvSchema.safeParse(process.env);

// if (error) {
//   const errors = error.flatten().fieldErrors;

//   const tableData = Object.entries(errors).map(([key, messages]) => ({
//     Variable: key,
//     Error: messages?.join(", "),
//   }));

//   console.error("Invalid environment variables:\n");

//   console.table(tableData);
//   process.exit(1);
// }

// export default env;
