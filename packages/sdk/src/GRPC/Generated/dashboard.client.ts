/* eslint-disable */
// @ts-nocheck
// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "dashboard.proto" (package "gooseai", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { DashboardService } from "./dashboard";
import type { GetAutoChargeRequest } from "./dashboard";
import type { AutoChargeIntent } from "./dashboard";
import type { CreateAutoChargeIntentRequest } from "./dashboard";
import type { Charges } from "./dashboard";
import type { GetChargesRequest } from "./dashboard";
import type { Charge } from "./dashboard";
import type { CreateChargeRequest } from "./dashboard";
import type { UserPasswordChangeTicket } from "./dashboard";
import type { UpdateUserInfoRequest } from "./dashboard";
import type { ClientSettings } from "./dashboard";
import type { UpdateDefaultOrganizationRequest } from "./dashboard";
import type { APIKeyFindRequest } from "./dashboard";
import type { APIKey } from "./dashboard";
import type { APIKeyRequest } from "./dashboard";
import type { Metrics } from "./dashboard";
import type { GetMetricsRequest } from "./dashboard";
import type { Organization } from "./dashboard";
import type { GetOrganizationRequest } from "./dashboard";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { User } from "./dashboard";
import type { EmptyRequest } from "./dashboard";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service gooseai.DashboardService
 */
export interface IDashboardServiceClient {
    /**
     * Get info
     *
     * @generated from protobuf rpc: GetMe(gooseai.EmptyRequest) returns (gooseai.User);
     */
    getMe(input: EmptyRequest, options?: RpcOptions): UnaryCall<EmptyRequest, User>;
    /**
     * @generated from protobuf rpc: GetOrganization(gooseai.GetOrganizationRequest) returns (gooseai.Organization);
     */
    getOrganization(input: GetOrganizationRequest, options?: RpcOptions): UnaryCall<GetOrganizationRequest, Organization>;
    /**
     * @generated from protobuf rpc: GetMetrics(gooseai.GetMetricsRequest) returns (gooseai.Metrics);
     */
    getMetrics(input: GetMetricsRequest, options?: RpcOptions): UnaryCall<GetMetricsRequest, Metrics>;
    /**
     * API key management
     *
     * @generated from protobuf rpc: CreateAPIKey(gooseai.APIKeyRequest) returns (gooseai.APIKey);
     */
    createAPIKey(input: APIKeyRequest, options?: RpcOptions): UnaryCall<APIKeyRequest, APIKey>;
    /**
     * @generated from protobuf rpc: DeleteAPIKey(gooseai.APIKeyFindRequest) returns (gooseai.APIKey);
     */
    deleteAPIKey(input: APIKeyFindRequest, options?: RpcOptions): UnaryCall<APIKeyFindRequest, APIKey>;
    /**
     * User settings
     *
     * @generated from protobuf rpc: UpdateDefaultOrganization(gooseai.UpdateDefaultOrganizationRequest) returns (gooseai.User);
     */
    updateDefaultOrganization(input: UpdateDefaultOrganizationRequest, options?: RpcOptions): UnaryCall<UpdateDefaultOrganizationRequest, User>;
    /**
     * @generated from protobuf rpc: GetClientSettings(gooseai.EmptyRequest) returns (gooseai.ClientSettings);
     */
    getClientSettings(input: EmptyRequest, options?: RpcOptions): UnaryCall<EmptyRequest, ClientSettings>;
    /**
     * @generated from protobuf rpc: SetClientSettings(gooseai.ClientSettings) returns (gooseai.ClientSettings);
     */
    setClientSettings(input: ClientSettings, options?: RpcOptions): UnaryCall<ClientSettings, ClientSettings>;
    /**
     * @generated from protobuf rpc: UpdateUserInfo(gooseai.UpdateUserInfoRequest) returns (gooseai.User);
     */
    updateUserInfo(input: UpdateUserInfoRequest, options?: RpcOptions): UnaryCall<UpdateUserInfoRequest, User>;
    /**
     * @generated from protobuf rpc: CreatePasswordChangeTicket(gooseai.EmptyRequest) returns (gooseai.UserPasswordChangeTicket);
     */
    createPasswordChangeTicket(input: EmptyRequest, options?: RpcOptions): UnaryCall<EmptyRequest, UserPasswordChangeTicket>;
    /**
     * @generated from protobuf rpc: DeleteAccount(gooseai.EmptyRequest) returns (gooseai.User);
     */
    deleteAccount(input: EmptyRequest, options?: RpcOptions): UnaryCall<EmptyRequest, User>;
    /**
     * Payment functions
     *
     * @generated from protobuf rpc: CreateCharge(gooseai.CreateChargeRequest) returns (gooseai.Charge);
     */
    createCharge(input: CreateChargeRequest, options?: RpcOptions): UnaryCall<CreateChargeRequest, Charge>;
    /**
     * @generated from protobuf rpc: GetCharges(gooseai.GetChargesRequest) returns (gooseai.Charges);
     */
    getCharges(input: GetChargesRequest, options?: RpcOptions): UnaryCall<GetChargesRequest, Charges>;
    /**
     * @generated from protobuf rpc: CreateAutoChargeIntent(gooseai.CreateAutoChargeIntentRequest) returns (gooseai.AutoChargeIntent);
     */
    createAutoChargeIntent(input: CreateAutoChargeIntentRequest, options?: RpcOptions): UnaryCall<CreateAutoChargeIntentRequest, AutoChargeIntent>;
    /**
     * @generated from protobuf rpc: UpdateAutoChargeIntent(gooseai.CreateAutoChargeIntentRequest) returns (gooseai.AutoChargeIntent);
     */
    updateAutoChargeIntent(input: CreateAutoChargeIntentRequest, options?: RpcOptions): UnaryCall<CreateAutoChargeIntentRequest, AutoChargeIntent>;
    /**
     * @generated from protobuf rpc: GetAutoChargeIntent(gooseai.GetAutoChargeRequest) returns (gooseai.AutoChargeIntent);
     */
    getAutoChargeIntent(input: GetAutoChargeRequest, options?: RpcOptions): UnaryCall<GetAutoChargeRequest, AutoChargeIntent>;
}
/**
 * @generated from protobuf service gooseai.DashboardService
 */
export class DashboardServiceClient implements IDashboardServiceClient, ServiceInfo {
    typeName = DashboardService.typeName;
    methods = DashboardService.methods;
    options = DashboardService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Get info
     *
     * @generated from protobuf rpc: GetMe(gooseai.EmptyRequest) returns (gooseai.User);
     */
    getMe(input: EmptyRequest, options?: RpcOptions): UnaryCall<EmptyRequest, User> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<EmptyRequest, User>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetOrganization(gooseai.GetOrganizationRequest) returns (gooseai.Organization);
     */
    getOrganization(input: GetOrganizationRequest, options?: RpcOptions): UnaryCall<GetOrganizationRequest, Organization> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetOrganizationRequest, Organization>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetMetrics(gooseai.GetMetricsRequest) returns (gooseai.Metrics);
     */
    getMetrics(input: GetMetricsRequest, options?: RpcOptions): UnaryCall<GetMetricsRequest, Metrics> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetMetricsRequest, Metrics>("unary", this._transport, method, opt, input);
    }
    /**
     * API key management
     *
     * @generated from protobuf rpc: CreateAPIKey(gooseai.APIKeyRequest) returns (gooseai.APIKey);
     */
    createAPIKey(input: APIKeyRequest, options?: RpcOptions): UnaryCall<APIKeyRequest, APIKey> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<APIKeyRequest, APIKey>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DeleteAPIKey(gooseai.APIKeyFindRequest) returns (gooseai.APIKey);
     */
    deleteAPIKey(input: APIKeyFindRequest, options?: RpcOptions): UnaryCall<APIKeyFindRequest, APIKey> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<APIKeyFindRequest, APIKey>("unary", this._transport, method, opt, input);
    }
    /**
     * User settings
     *
     * @generated from protobuf rpc: UpdateDefaultOrganization(gooseai.UpdateDefaultOrganizationRequest) returns (gooseai.User);
     */
    updateDefaultOrganization(input: UpdateDefaultOrganizationRequest, options?: RpcOptions): UnaryCall<UpdateDefaultOrganizationRequest, User> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateDefaultOrganizationRequest, User>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetClientSettings(gooseai.EmptyRequest) returns (gooseai.ClientSettings);
     */
    getClientSettings(input: EmptyRequest, options?: RpcOptions): UnaryCall<EmptyRequest, ClientSettings> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<EmptyRequest, ClientSettings>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: SetClientSettings(gooseai.ClientSettings) returns (gooseai.ClientSettings);
     */
    setClientSettings(input: ClientSettings, options?: RpcOptions): UnaryCall<ClientSettings, ClientSettings> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<ClientSettings, ClientSettings>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateUserInfo(gooseai.UpdateUserInfoRequest) returns (gooseai.User);
     */
    updateUserInfo(input: UpdateUserInfoRequest, options?: RpcOptions): UnaryCall<UpdateUserInfoRequest, User> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateUserInfoRequest, User>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreatePasswordChangeTicket(gooseai.EmptyRequest) returns (gooseai.UserPasswordChangeTicket);
     */
    createPasswordChangeTicket(input: EmptyRequest, options?: RpcOptions): UnaryCall<EmptyRequest, UserPasswordChangeTicket> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<EmptyRequest, UserPasswordChangeTicket>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DeleteAccount(gooseai.EmptyRequest) returns (gooseai.User);
     */
    deleteAccount(input: EmptyRequest, options?: RpcOptions): UnaryCall<EmptyRequest, User> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<EmptyRequest, User>("unary", this._transport, method, opt, input);
    }
    /**
     * Payment functions
     *
     * @generated from protobuf rpc: CreateCharge(gooseai.CreateChargeRequest) returns (gooseai.Charge);
     */
    createCharge(input: CreateChargeRequest, options?: RpcOptions): UnaryCall<CreateChargeRequest, Charge> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateChargeRequest, Charge>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetCharges(gooseai.GetChargesRequest) returns (gooseai.Charges);
     */
    getCharges(input: GetChargesRequest, options?: RpcOptions): UnaryCall<GetChargesRequest, Charges> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetChargesRequest, Charges>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateAutoChargeIntent(gooseai.CreateAutoChargeIntentRequest) returns (gooseai.AutoChargeIntent);
     */
    createAutoChargeIntent(input: CreateAutoChargeIntentRequest, options?: RpcOptions): UnaryCall<CreateAutoChargeIntentRequest, AutoChargeIntent> {
        const method = this.methods[13], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateAutoChargeIntentRequest, AutoChargeIntent>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateAutoChargeIntent(gooseai.CreateAutoChargeIntentRequest) returns (gooseai.AutoChargeIntent);
     */
    updateAutoChargeIntent(input: CreateAutoChargeIntentRequest, options?: RpcOptions): UnaryCall<CreateAutoChargeIntentRequest, AutoChargeIntent> {
        const method = this.methods[14], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateAutoChargeIntentRequest, AutoChargeIntent>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetAutoChargeIntent(gooseai.GetAutoChargeRequest) returns (gooseai.AutoChargeIntent);
     */
    getAutoChargeIntent(input: GetAutoChargeRequest, options?: RpcOptions): UnaryCall<GetAutoChargeRequest, AutoChargeIntent> {
        const method = this.methods[15], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetAutoChargeRequest, AutoChargeIntent>("unary", this._transport, method, opt, input);
    }
}
