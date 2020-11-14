import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** A timestamp */
    Date: string;
};

export type InputDive = {
    user: Scalars['ID'];
    flow: Scalars['ID'];
    createdAt: Scalars['Date'];
};

export type Dive = {
    __typename?: 'Dive';
    _id: Scalars['ID'];
    user: User;
    flow: Flow;
    createdAt: Scalars['Date'];
};

export type InputUserFlow = {
    user?: Maybe<Scalars['ID']>;
    flow?: Maybe<Scalars['ID']>;
};

export type UserFlow = {
    __typename?: 'UserFlow';
    _id: Scalars['ID'];
    user: User;
    flow: Flow;
};


export type InputFlow = {
    name: Scalars['String'];
    description: Scalars['String'];
    owner?: Maybe<Scalars['ID']>;
    flowItems: Array<InputFlowItem>;
    flowItemConnections: Array<InputFlowItemConnection>;
};

export type Flow = {
    __typename?: 'Flow';
    _id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    rootSize: Scalars['Int'];
    flowItems: Array<FlowItem>;
    flowConnections: Array<FlowItemConnection>;
    owner?: Maybe<User>;
};

export type InputFlowItem = {
    flow?: Maybe<Scalars['ID']>;
    item?: Maybe<Scalars['ID']>;
};

export type FlowItem = {
    __typename?: 'FlowItem';
    _id: Scalars['String'];
    flow: Flow;
    item: Item;
    description: Scalars['String'];
};

export type InputFlowItemConnection = {
    description: Scalars['String'];
    from?: Maybe<Scalars['Int']>;
    to?: Maybe<Scalars['Int']>;
};

export type FlowItemConnection = {
    __typename?: 'FlowItemConnection';
    _id: Scalars['ID'];
    flow?: Maybe<Flow>;
    description: Scalars['String'];
    from: FlowItem;
    to: FlowItem;
};

export type InputItem = {
    name: Scalars['String'];
    url: Scalars['String'];
    type: ItemType;
};

export type Item = {
    __typename?: 'Item';
    _id: Scalars['ID'];
    title: Scalars['String'];
    subtitle: Scalars['String'];
    url: Scalars['String'];
    type: ItemType;
    thumbnail: Scalars['String'];
    image: Scalars['String'];
    flowItems: Array<FlowItem>;
    flowItem?: Maybe<FlowItem>;
};


export type ItemFlowItemArgs = {
    flow?: Maybe<Scalars['ID']>;
};

export enum ItemType {
    Album = 'Album'
}

export type InputUser = {
    name: Scalars['String'];
};

export type User = {
    __typename?: 'User';
    _id: Scalars['ID'];
    name: Scalars['String'];
    flows: Array<Flow>;
};

export type InputUserItem = {
    user: Scalars['ID'];
    item: Scalars['ID'];
    createdAt: Scalars['Date'];
};

export type UserItem = {
    __typename?: 'UserItem';
    _id: Scalars['ID'];
    user: User;
    item: Item;
    createdAt: Scalars['Date'];
};

export type Query = {
    __typename?: 'Query';
    flow: Flow;
    user: User;
    item: Item;
    searchItem: Array<Item>;
};


export type QueryFlowArgs = {
    _id: Scalars['ID'];
};


export type QueryUserArgs = {
    _id: Scalars['ID'];
};


export type QueryItemArgs = {
    _id: Scalars['ID'];
};


export type QuerySearchItemArgs = {
    name: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createDive: Dive;
    createFlow: Flow;
    createItem: Item;
    createUser: User;
    createUserItem: User;
};


export type MutationCreateDiveArgs = {
    user: Scalars['ID'];
    flow: Scalars['ID'];
};


export type MutationCreateFlowArgs = {
    flow: InputFlow;
};


export type MutationCreateItemArgs = {
    item: InputItem;
};


export type MutationCreateUserArgs = {
    user?: Maybe<InputUser>;
};


export type MutationCreateUserItemArgs = {
    user?: Maybe<InputUser>;
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
    { __typename?: 'Query' }
    & {
    flow: (
        { __typename?: 'Flow' }
        & Pick<Flow, 'name'>
        )
}
    );


export const Document = gql`
    {
        flow(_id: "") {
            name
        }
    }
`;

/**
 * __useQuery__
 *
 * To run a query within a React component, call `useQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuery(baseOptions?: Apollo.QueryHookOptions<Query, QueryVariables>) {
    return Apollo.useQuery<Query, QueryVariables>(Document, baseOptions);
}

export function useLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Query, QueryVariables>) {
    return Apollo.useLazyQuery<Query, QueryVariables>(Document, baseOptions);
}

export type QueryHookResult = ReturnType<typeof useQuery>;
export type LazyQueryHookResult = ReturnType<typeof useLazyQuery>;
export type QueryResult = Apollo.QueryResult<Query, QueryVariables>;