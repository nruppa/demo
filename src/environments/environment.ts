// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://172.17.10.103:7071';
const baseUrl1 = 'http://172.17.10.103:7071/mercer/apitracking';

export const environment = {
  production: false,
  transactionHourData: baseUrl + '/dailyStatsView/lineChart',
  vendorDailyReports: baseUrl + '/dailyStatsView/piechart',
  getUser: baseUrl1 + '/user/search',
  addUser: baseUrl1 + '/addUser',
  deleteUser: baseUrl1 + '/deleteUser/',
  updateUser: baseUrl1 + '/updateUser/',
  trackingCustomet: baseUrl1 + '/lookup/customers',
  // getAllTracking: baseUrl1 + '/tracking/detailsdata',
  trackingSearch: baseUrl1 + '/tracking-details',
  customerPiechartReports: baseUrl + '/reports/customersPiechart',
  vendorPiechartReports: baseUrl + '/reports/vendorsPiechart',
  customerReportsTable: baseUrl + "/reports/customersTableData",
  vendorReportsTable: baseUrl + "/reports/vendorsTableData",
  //getVendorDetails: baseUrl + '/fetchVendorsSendToInfo',
  getCustomers: baseUrl1 + '/customers',
  addCustomer: baseUrl1 + '/addCustomer',
  updateCustomer: baseUrl1 + '/updateCustomer/',
  getTrackingExcel: baseUrl1 + '',
  getVendorsList:baseUrl1+"/fetchVendorDetails",
  getVendorDetails:baseUrl1+"/fetchSendToDetailsbyVendorId",
  updateVendorDetails:baseUrl1+"/updateVendorsSendToDetails"
}




/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
