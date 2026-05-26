// import { IWebConfig } from './configs/app-config';

export class AppConsts {
  // static webConfig: IWebConfig;
  static privileges: string[];
  static locale: string;
  static localeCurrency: string;
  static loggedInUserId: string;
}

export enum EtechPrivileges {
  UsersRead = 'Users.Read',
  UsersManage = 'Users.Manage',
  AdminImpersonation = 'Admin.Impersonation',

  ServiceProvidersRead = 'ServiceProviders.Read',
  ServiceProvidersEdit = 'ServiceProviders.Edit',
  ServiceProvidersAdmin = 'ServiceProviders.Admin',
  ServiceProviderSettingsRead = 'ServiceProviderSettings.Read',
  ServiceProviderSettingsManage = 'ServiceProviderSettings.Manage',

  StoresRead = 'Stores.Read',
  StoresEdit = 'Stores.Edit',
  StoresAdmin = 'Stores.Admin',
  StoreSettingsRead = 'StoreSettings.Read',
  StoreSettingsManage = 'StoreSettings.Manage',

  MaintenanceRead = 'Maintenance.Read',
  MaintenanceEdit = 'Maintenance.Edit',
  MaintenanceAdmin = 'Maintenance.Admin',

  WarrantyProvidersRead = 'WarrantyProvider.Read',
}
