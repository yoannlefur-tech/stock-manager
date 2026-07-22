import type { UserName } from "../types/user";
import { capitalizeString } from "./stringFormatters";

export function stringAvatar(name: string) {
  const parts = name.split(" ");
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return {
    children: `${first}${second}`,
  };
}

export const formatUserName = (
  { firstName, lastName }: UserName = {},
  invert = false,
): string =>
  (invert
    ? [capitalizeString(firstName), lastName?.toUpperCase()]
    : [lastName?.toUpperCase(), capitalizeString(firstName)]
  )
    .filter(Boolean)
    .join(" ");

export const formatUserNameInitials = (
  { firstName = "", lastName = "" }: UserName = {},
  invert = false,
): string => {
  const [firstNameInitial = ""] = firstName ?? "";

  const lastNameInitials = (lastName ?? "")
    .split(" ")
    .map((word) => word[0] ?? "")
    .join("");

  return (
    invert
      ? [lastNameInitials, firstNameInitial]
      : [firstNameInitial, lastNameInitials]
  )
    .join("")
    .toUpperCase();
};
