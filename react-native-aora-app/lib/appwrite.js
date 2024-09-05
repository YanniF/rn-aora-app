import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.yannif.aora',
  projectId: '66d058f3000340691ac8',
  databaseId: '66d05a11001361f7f8c8',
  userCollectionId: '66d05a3400123e3b5209',
  videoCollectionId: '66d05a4b002f142406f3',
  storageId: '66d05b53000b76630de7'
}

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId
} = appwriteConfig

// Register user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) {
      throw new Error('Error while creating account')
    }

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    return await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    )
  }
  catch (error) {
    console.error(error);
    throw new Error(error)
  }
}

export const signIn = async (email, password) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  }
  catch (error) {
    console.error(error);
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) {
      throw new Error('Account not found')
    }

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) {
      throw new Error('User not found')
    }

    return currentUser.documents[0]
  }
  catch (error) {
    console.error(error);
    throw new Error(error)
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    )

    return posts.documents
  }
  catch (error) {
    console.error(error);
    throw new Error(error)
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    )

    return posts.documents
  }
  catch (error) {
    console.error(error);
    throw new Error(error)
  }
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('title', query)]
    )

    if (!posts) {
      throw new Error("Something went wrong");
    }

    return posts.documents
  }
  catch (error) {
    console.error(error);
    throw new Error(error)
  }
}
