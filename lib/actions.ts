import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000/';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } catch (error) {
        throw error;
    }
};

export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            email,
        },
    };
    return makeGraphQLRequest(getUserQuery, variables);
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name,
            email,
            avatarUrl,
        },
    };
    return makeGraphQLRequest(createUserMutation, variables);
};
