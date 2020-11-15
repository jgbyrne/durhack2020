import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IDive, IInputDive } from '../objects/dive';
import { IUserFlow, IInputUserFlow } from '../objects/userFlow';
import { IFlow, IInputFlow } from '../objects/flow';
import { IFlowItem, IInputFlowItem } from '../objects/flowItem';
import { IFlowItemConnection, IInputFlowItemConnection } from '../objects/flowItemConnection';
import { ISearchItem } from '../objects/searchItem';
import { IItem, IInputItem } from '../objects/item';
import { IUser, IInputUser } from '../objects/user';
import { IUserItem, IInputUserItem } from '../objects/userItem';
import { GraphQLContext } from '../index';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  user?: Maybe<Scalars['ID']>;
  flow?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
};

export type Dive = {
  __typename?: 'Dive';
  _id: Scalars['ID'];
  user?: Maybe<User>;
  flow?: Maybe<Flow>;
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

export type SearchItem = {
  __typename?: 'SearchItem';
  id: Scalars['ID'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  type: ItemType;
  item: Item;
};

export type InputUser = {
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  flows?: Maybe<Array<Maybe<Flow>>>;
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
  searchItem: Array<SearchItem>;
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
  itemType: ItemType;
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
  user: InputUser;
};


export type MutationCreateUserItemArgs = {
  user: InputUser;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  InputDive: ResolverTypeWrapper<IInputDive>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Dive: ResolverTypeWrapper<IDive>;
  InputUserFlow: ResolverTypeWrapper<IInputUserFlow>;
  UserFlow: ResolverTypeWrapper<IUserFlow>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  InputFlow: ResolverTypeWrapper<IInputFlow>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Flow: ResolverTypeWrapper<IFlow>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InputFlowItem: ResolverTypeWrapper<IInputFlowItem>;
  FlowItem: ResolverTypeWrapper<IFlowItem>;
  InputFlowItemConnection: InputFlowItemConnection;
  FlowItemConnection: ResolverTypeWrapper<Omit<FlowItemConnection, 'flow' | 'from' | 'to'> & { flow?: Maybe<ResolversTypes['Flow']>, from: ResolversTypes['FlowItem'], to: ResolversTypes['FlowItem'] }>;
  InputItem: ResolverTypeWrapper<IInputItem>;
  Item: ResolverTypeWrapper<IItem>;
  ItemType: ItemType;
  SearchItem: ResolverTypeWrapper<ISearchItem>;
  InputUser: ResolverTypeWrapper<IInputUser>;
  User: ResolverTypeWrapper<IUser>;
  InputUserItem: InputUserItem;
  UserItem: ResolverTypeWrapper<Omit<UserItem, 'user' | 'item'> & { user: ResolversTypes['User'], item: ResolversTypes['Item'] }>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  InputDive: IInputDive;
  ID: Scalars['ID'];
  Dive: IDive;
  InputUserFlow: IInputUserFlow;
  UserFlow: IUserFlow;
  Date: Scalars['Date'];
  InputFlow: IInputFlow;
  String: Scalars['String'];
  Flow: IFlow;
  Int: Scalars['Int'];
  InputFlowItem: IInputFlowItem;
  FlowItem: IFlowItem;
  InputFlowItemConnection: InputFlowItemConnection;
  FlowItemConnection: Omit<FlowItemConnection, 'flow' | 'from' | 'to'> & { flow?: Maybe<ResolversParentTypes['Flow']>, from: ResolversParentTypes['FlowItem'], to: ResolversParentTypes['FlowItem'] };
  InputItem: IInputItem;
  Item: IItem;
  SearchItem: ISearchItem;
  InputUser: IInputUser;
  User: IUser;
  InputUserItem: InputUserItem;
  UserItem: Omit<UserItem, 'user' | 'item'> & { user: ResolversParentTypes['User'], item: ResolversParentTypes['Item'] };
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
};

export type DiveResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['Dive']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  flow?: Resolver<Maybe<ResolversTypes['Flow']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserFlowResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['UserFlow']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  flow?: Resolver<ResolversTypes['Flow'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FlowResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['Flow']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rootSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  flowItems?: Resolver<Array<ResolversTypes['FlowItem']>, ParentType, ContextType>;
  flowConnections?: Resolver<Array<ResolversTypes['FlowItemConnection']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlowItemResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['FlowItem']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flow?: Resolver<ResolversTypes['Flow'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlowItemConnectionResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['FlowItemConnection']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  flow?: Resolver<Maybe<ResolversTypes['Flow']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['FlowItem'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['FlowItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['Item']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flowItems?: Resolver<Array<ResolversTypes['FlowItem']>, ParentType, ContextType>;
  flowItem?: Resolver<Maybe<ResolversTypes['FlowItem']>, ParentType, ContextType, RequireFields<ItemFlowItemArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchItemResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['SearchItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Flow']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserItemResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['UserItem']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['Query']> = {
  flow?: Resolver<ResolversTypes['Flow'], ParentType, ContextType, RequireFields<QueryFlowArgs, '_id'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<QueryItemArgs, '_id'>>;
  searchItem?: Resolver<Array<ResolversTypes['SearchItem']>, ParentType, ContextType, RequireFields<QuerySearchItemArgs, 'name' | 'itemType'>>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType = ResolversParentTypes['Mutation']> = {
  createDive?: Resolver<ResolversTypes['Dive'], ParentType, ContextType, RequireFields<MutationCreateDiveArgs, 'user' | 'flow'>>;
  createFlow?: Resolver<ResolversTypes['Flow'], ParentType, ContextType, RequireFields<MutationCreateFlowArgs, 'flow'>>;
  createItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'item'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  createUserItem?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserItemArgs, 'user'>>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Dive?: DiveResolvers<ContextType>;
  UserFlow?: UserFlowResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Flow?: FlowResolvers<ContextType>;
  FlowItem?: FlowItemResolvers<ContextType>;
  FlowItemConnection?: FlowItemConnectionResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  SearchItem?: SearchItemResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserItem?: UserItemResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphQLContext> = Resolvers<ContextType>;
