import axios from "axios";

interface ErrorWithResponseMessage {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const hasResponseMessage = (
  error: unknown,
): error is ErrorWithResponseMessage => {
  return typeof error === "object" && error !== null && "response" in error;
};

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallback;
  }

  if (hasResponseMessage(error)) {
    return error.response?.data?.message || fallback;
  }

  return fallback;
};
