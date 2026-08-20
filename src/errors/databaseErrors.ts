import { ConflictError } from "./errorTypes.js";

export function handleDatabaseErrors(error: any): never {
  switch (error.code) {
    case "ER_DUP_ENTRY":
      throw new ConflictError("A record with this value already exists");
    case "ER_NO_REFERENCED_ROW_2":
      throw new ConflictError("Referenced record does not exist");
    case "ER_ROW_IS_REFERENCED_2":
      throw new ConflictError(
        "Cannot delete this record because it is being used",
      );
    default:
      throw error;
  }
}
