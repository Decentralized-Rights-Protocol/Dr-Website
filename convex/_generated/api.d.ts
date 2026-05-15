/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as activities from "../activities.js";
import type * as audit from "../audit.js";
import type * as blockchain from "../blockchain.js";
import type * as docs from "../docs.js";
import type * as governance from "../governance.js";
import type * as learn from "../learn.js";
import type * as lib_domain from "../lib/domain.js";
import type * as lib_drp_crypto from "../lib/drp/crypto.js";
import type * as lib_drp_elders from "../lib/drp/elders.js";
import type * as lib_drp_types from "../lib/drp/types.js";
import type * as lib_time from "../lib/time.js";
import type * as metrics from "../metrics.js";
import type * as notifications from "../notifications.js";
import type * as proofs from "../proofs.js";
import type * as review from "../review.js";
import type * as submissions from "../submissions.js";
import type * as sync from "../sync.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  activities: typeof activities;
  audit: typeof audit;
  blockchain: typeof blockchain;
  docs: typeof docs;
  governance: typeof governance;
  learn: typeof learn;
  "lib/domain": typeof lib_domain;
  "lib/drp/crypto": typeof lib_drp_crypto;
  "lib/drp/elders": typeof lib_drp_elders;
  "lib/drp/types": typeof lib_drp_types;
  "lib/time": typeof lib_time;
  metrics: typeof metrics;
  notifications: typeof notifications;
  proofs: typeof proofs;
  review: typeof review;
  submissions: typeof submissions;
  sync: typeof sync;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
