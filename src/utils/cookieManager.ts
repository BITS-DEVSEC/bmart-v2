import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";

export const setCookie = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  return await SecureStoragePlugin.set({ key, value });
};

export const getCookie = async ({ key }: { key: string }) => {
  try {
    return await SecureStoragePlugin.get({ key });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteCookie = async ({ key }: { key: string }) => {
  return await SecureStoragePlugin.remove({ key });
};
