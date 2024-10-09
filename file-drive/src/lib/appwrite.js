import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66bd3574002597068e75>');

export const account = new Account(client);
export { ID } from 'appwrite';
