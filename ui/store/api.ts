import {createApi} from '@reduxjs/toolkit/query/react';
import {GraphQLClient} from 'graphql-request';
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query';

function BearerTokenHeader(headers: Headers, api: { getState: () => unknown }) {
    // const token = (api.getState() as RootState).authSlice.token;
    // if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    // }
    return headers;
}

export const client = new GraphQLClient('/graphql');
// highlight-start
export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        client: client,
        prepareHeaders: (headers, api) => BearerTokenHeader(headers, api),
    }),
    endpoints: () => ({}),
});
// highlight-end

export default api;