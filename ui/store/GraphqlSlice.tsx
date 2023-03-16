import { api } from './api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Jwt = {
  __typename?: 'JWT';
  makeToken?: Maybe<AccessToken>;
};


export type JwtMakeTokenArgs = {
  code: Scalars['String'];
};

/** RootMutation */
export type Mutation = {
  __typename?: 'Mutation';
  /** Authorization */
  auth?: Maybe<Jwt>;
  /** Workload */
  workload?: Maybe<WorkloadMutation>;
};

/** RootQuery */
export type Query = {
  __typename?: 'Query';
  /** Query for workload */
  workload?: Maybe<WorkloadQuery>;
};

/** Workload information */
export type Workload = {
  __typename?: 'Workload';
  /** Workload ID */
  id?: Maybe<Scalars['Int']>;
  /** Workload Title */
  title: Scalars['String'];
  /** Workload Type */
  workload_type: Scalars['String'];
};

export type WorkloadMutation = {
  __typename?: 'WorkloadMutation';
  deleteWorkload?: Maybe<Workload>;
  saveOrCreateWorkload?: Maybe<Workload>;
};


export type WorkloadMutationDeleteWorkloadArgs = {
  id: Scalars['Int'];
};


export type WorkloadMutationSaveOrCreateWorkloadArgs = {
  id?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};

/** Query for workload */
export type WorkloadQuery = {
  __typename?: 'WorkloadQuery';
  /** Get workload information */
  getWorkload?: Maybe<Array<Maybe<Workload>>>;
};


/** Query for workload */
export type WorkloadQueryGetWorkloadArgs = {
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type AccessToken = {
  __typename?: 'accessToken';
  value: Scalars['String'];
};

export type CreateWorkloadMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
}>;


export type CreateWorkloadMutation = { __typename?: 'Mutation', workload?: { __typename?: 'WorkloadMutation', saveOrCreateWorkload?: { __typename?: 'Workload', id?: number | null, title: string } | null } | null };

export type DeleteWorkloadMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteWorkloadMutation = { __typename?: 'Mutation', workload?: { __typename?: 'WorkloadMutation', deleteWorkload?: { __typename?: 'Workload', id?: number | null } | null } | null };

export type GetWorkloadsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
}>;


export type GetWorkloadsQuery = { __typename?: 'Query', workload?: { __typename?: 'WorkloadQuery', getWorkload?: Array<{ __typename?: 'Workload', id?: number | null, title: string } | null> | null } | null };


export const CreateWorkloadDocument = `
    mutation createWorkload($id: Int, $title: String!) {
  workload {
    saveOrCreateWorkload(id: $id, title: $title) {
      id
      title
    }
  }
}
    `;
export const DeleteWorkloadDocument = `
    mutation deleteWorkload($id: Int!) {
  workload {
    deleteWorkload(id: $id) {
      id
    }
  }
}
    `;
export const GetWorkloadsDocument = `
    query getWorkloads($id: Int, $title: String) {
  workload {
    getWorkload(id: $id, title: $title) {
      id
      title
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createWorkload: build.mutation<CreateWorkloadMutation, CreateWorkloadMutationVariables>({
      query: (variables) => ({ document: CreateWorkloadDocument, variables })
    }),
    deleteWorkload: build.mutation<DeleteWorkloadMutation, DeleteWorkloadMutationVariables>({
      query: (variables) => ({ document: DeleteWorkloadDocument, variables })
    }),
    getWorkloads: build.query<GetWorkloadsQuery, GetWorkloadsQueryVariables | void>({
      query: (variables) => ({ document: GetWorkloadsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateWorkloadMutation, useDeleteWorkloadMutation, useGetWorkloadsQuery, useLazyGetWorkloadsQuery } = injectedRtkApi;

