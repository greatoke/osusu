import { Platform } from 'react-native';
import { Client, Account, ID } from 'react-native-appwrite';

const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || ""
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || ""
const PLATFORM_IOS = process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID || ""
const PLATFORM_ANDROID = process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME || ""

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)

switch (Platform.OS) {
    case "ios":
        client.setPlatform(PLATFORM_IOS)
        break;
    case "android":
        client.setPlatform(PLATFORM_ANDROID)
        break;

    default:
        break;
}

export const account = new Account(client)