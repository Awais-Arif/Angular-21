import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {

  constructor() {
    this.initMockDb();
  }

  private initMockDb() {
    if (!localStorage.getItem('mock_license_types')) {
      localStorage.setItem('mock_license_types', JSON.stringify([
        { id: 1, name: 'State Clinical License' },
        { id: 2, name: 'Board Certified Practitioner' },
        { id: 3, name: 'Registered Massage Therapist' }
      ]));
    }

    if (!localStorage.getItem('mock_therapy_types')) {
      localStorage.setItem('mock_therapy_types', JSON.stringify([
        { id: 1, name: 'Cognitive Behavioral Therapy (CBT)' },
        { id: 2, name: 'Physiotherapy' },
        { id: 3, name: 'Massage Therapy' },
        { id: 4, name: 'Occupational Therapy' }
      ]));
    }

    if (!localStorage.getItem('mock_specializations')) {
      localStorage.setItem('mock_specializations', JSON.stringify([
        { id: 1, name: 'Adult Anxiety' },
        { id: 2, name: 'Stress Management' },
        { id: 3, name: 'Child Counseling' }
      ]));
    }

    if (!localStorage.getItem('mock_rejection_reasons')) {
      localStorage.setItem('mock_rejection_reasons', JSON.stringify([
        { id: 1, name: 'Incomplete Qualification Documentation' },
        { id: 2, name: 'Expired License Registration' },
        { id: 3, name: 'Invalid Insurance Document' }
      ]));
    }

    if (!localStorage.getItem('mock_settings')) {
      localStorage.setItem('mock_settings', JSON.stringify([
        {
          id: 1,
          withdrawalPercentage: 10,
          servicePercentage: 15,
          serviceProviderAvailability: 30
        }
      ]));
    }

    if (!localStorage.getItem('mock_service_providers')) {
      localStorage.setItem('mock_service_providers', JSON.stringify([
        {
          id: 1,
          userId: 101,
          fullName: 'Dr. Sarah Jenkins',
          bio: 'Specialist in Cognitive Behavioral Therapy with over 10 years of experience helping patients restore balance in their lives.',
          gender: 'Female',
          profilePicture: 'assets/images/user.png',
          businessAddress: '123 Health Ave, Suite 400',
          businessPhoneNumber: '555-0192',
          streetAddress: '123 Health Ave',
          city: 'Chicago',
          state: 'IL',
          zip: '60611',
          isApproved: true
        },
        {
          id: 2,
          userId: 102,
          fullName: 'John Miller, RMT',
          bio: 'Registered Massage Therapist specializing in deep tissue massage and sports injury rehabilitation.',
          gender: 'Male',
          profilePicture: 'assets/images/user.png',
          businessAddress: '456 Wellness Way',
          businessPhoneNumber: '555-0143',
          streetAddress: '456 Wellness Way',
          city: 'Boston',
          state: 'MA',
          zip: '02108',
          isApproved: false
        }
      ]));
    }

    if (!localStorage.getItem('mock_customers')) {
      localStorage.setItem('mock_customers', JSON.stringify([
        {
          User: {
            FirstName: 'Alice',
            LastName: 'Smith',
            Email: 'alice.smith@example.com',
            PhoneNumber: '555-0100'
          },
          ProfilePicture: 'assets/images/user.png',
          id: 1
        },
        {
          User: {
            FirstName: 'Robert',
            LastName: 'Johnson',
            Email: 'robert.j@example.com',
            PhoneNumber: '555-0188'
          },
          ProfilePicture: 'assets/images/user.png',
          id: 2
        }
      ]));
    }

    if (!localStorage.getItem('mock_orders')) {
      localStorage.setItem('mock_orders', JSON.stringify([
        {
          id: 1,
          service: { name: 'Initial CBT Counseling' },
          customerServiceRequest: {
            CustomerId: 1,
            Title: 'Anxiety Treatment',
            ServiceTypeId: 1,
            Description: 'Requires specialized CBT sessions due to work-related stress.',
            Images: '',
            Budget: 150
          },
          orderStatus: 3, // InProgress
          paymentStatus: 2, // Paid
          haveMilestone: false,
          totalPrice: 150,
          startDate: '2026-05-10',
          endDate: '2026-06-10',
          description: 'CBT Counseling for stress relief.',
          isAccepted: true,
          milestones: []
        },
        {
          id: 2,
          service: { name: 'Deep Tissue Massage Therapy' },
          customerServiceRequest: {
            CustomerId: 2,
            Title: 'Muscle recovery',
            ServiceTypeId: 3,
            Description: 'Lower back tension treatment.',
            Images: '',
            Budget: 95
          },
          orderStatus: 1, // Pending
          paymentStatus: 1, // Pending
          haveMilestone: false,
          totalPrice: 95,
          startDate: '2026-05-25',
          endDate: '2026-05-26',
          description: 'Therapeutic lower-back relief session.',
          isAccepted: false,
          milestones: []
        }
      ]));
    }

    if (!localStorage.getItem('mock_withdrawal_requests')) {
      localStorage.setItem('mock_withdrawal_requests', JSON.stringify([
        {
          id: 1,
          userId: 101,
          amount: 550,
          serviceProviderId: 1,
          serviceProviderName: 'Dr. Sarah Jenkins',
          createOn: '2026-05-20T10:00:00.000Z',
          withDrawalStatusId: 1 // Pending/unsettled
        },
        {
          id: 2,
          userId: 103,
          amount: 1200,
          serviceProviderId: 3,
          serviceProviderName: 'Dr. Marcus Vance',
          createOn: '2026-05-18T14:30:00.000Z',
          withDrawalStatusId: 2 // Approved
        }
      ]));
    }

    if (!localStorage.getItem('mock_complaints')) {
      localStorage.setItem('mock_complaints', JSON.stringify([
        {
          id: 1,
          complainantName: 'Alice Smith',
          complainantRole: 'Customer',
          accusedName: 'John Miller, RMT',
          title: 'Late appointment start',
          description: 'The practitioner arrived 20 minutes late without notification or apology.',
          createdOn: '2026-05-22T09:00:00Z',
          status: 'Open'
        }
      ]));
    }
  }

  private getFromDb(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  private saveToDb(key: string, data: any[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;

    // Check if the request is destined for the mocked API endpoints
    if (url.includes('api.mendedsolution.com/api/') || url.includes('/api/')) {
      return this.handleMockRequest(request);
    }

    return next.handle(request);
  }

  private handleMockRequest(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const url = request.url;
    let body: any = null;

    // 1. Account/CreateToken
    if (url.includes('Account/CreateToken')) {
      body = {
        token: 'mock-static-jwt-token-for-angular21-template-use',
        username: 'Admin User',
        role: 'Administrator'
      };
      return of(new HttpResponse({ status: 200, body: body })).pipe(delay(200));
    }

    // 2. Dashboard counts
    if (url.includes('Dashboard/GetDashboardCounts')) {
      const providers = this.getFromDb('mock_service_providers');
      const customers = this.getFromDb('mock_customers');
      const orders = this.getFromDb('mock_orders');
      body = {
        serviceProviders: providers.length,
        customers: customers.length,
        orders: orders.length
      };
      return of(new HttpResponse({ status: 200, body: { ok: true, body: body } })).pipe(delay(100));
    }

    // 3. LicenseType
    if (url.includes('LicenseType/GetList')) {
      const licenses = this.getFromDb('mock_license_types');
      return of(new HttpResponse({ status: 200, body: licenses })).pipe(delay(100));
    }
    if (url.includes('LicenseType/Create')) {
      const licenses = this.getFromDb('mock_license_types');
      const newLicense = {
        id: licenses.length > 0 ? Math.max(...licenses.map(l => l.id)) + 1 : 1,
        name: request.body?.name || 'Unnamed License'
      };
      licenses.push(newLicense);
      this.saveToDb('mock_license_types', licenses);
      return of(new HttpResponse({ status: 200, body: newLicense })).pipe(delay(100));
    }
    if (url.includes('LicenseType/Delete')) {
      let licenses = this.getFromDb('mock_license_types');
      const idToDelete = request.body?.id;
      licenses = licenses.filter(l => l.id !== idToDelete);
      this.saveToDb('mock_license_types', licenses);
      return of(new HttpResponse({ status: 200, body: true })).pipe(delay(100));
    }

    // 4. TherapyType
    if (url.includes('TherapyType/GetList')) {
      const therapies = this.getFromDb('mock_therapy_types');
      return of(new HttpResponse({ status: 200, body: therapies })).pipe(delay(100));
    }
    if (url.includes('TherapyType/Create')) {
      const therapies = this.getFromDb('mock_therapy_types');
      const newTherapy = {
        id: therapies.length > 0 ? Math.max(...therapies.map(t => t.id)) + 1 : 1,
        name: request.body?.name || 'Unnamed Therapy'
      };
      therapies.push(newTherapy);
      this.saveToDb('mock_therapy_types', therapies);
      return of(new HttpResponse({ status: 200, body: newTherapy })).pipe(delay(100));
    }
    if (url.includes('TherapyType/Delete')) {
      let therapies = this.getFromDb('mock_therapy_types');
      const idToDelete = request.body?.id;
      therapies = therapies.filter(t => t.id !== idToDelete);
      this.saveToDb('mock_therapy_types', therapies);
      return of(new HttpResponse({ status: 200, body: true })).pipe(delay(100));
    }

    // Specialization
    if (url.includes('Specialization/GetList')) {
      const specs = this.getFromDb('mock_specializations');
      return of(new HttpResponse({ status: 200, body: specs })).pipe(delay(100));
    }
    if (url.includes('Specialization/Create')) {
      const specs = this.getFromDb('mock_specializations');
      const newSpec = {
        id: specs.length > 0 ? Math.max(...specs.map(s => s.id)) + 1 : 1,
        name: request.body?.name || 'Unnamed Specialization'
      };
      specs.push(newSpec);
      this.saveToDb('mock_specializations', specs);
      return of(new HttpResponse({ status: 200, body: newSpec })).pipe(delay(100));
    }
    if (url.includes('Specialization/Delete')) {
      let specs = this.getFromDb('mock_specializations');
      const idToDelete = request.body?.id;
      specs = specs.filter(s => s.id !== idToDelete);
      this.saveToDb('mock_specializations', specs);
      return of(new HttpResponse({ status: 200, body: true })).pipe(delay(100));
    }

    // RejectionReason
    if (url.includes('RejectionReason/GetList')) {
      const reasons = this.getFromDb('mock_rejection_reasons');
      return of(new HttpResponse({ status: 200, body: reasons })).pipe(delay(100));
    }
    if (url.includes('RejectionReason/Create')) {
      const reasons = this.getFromDb('mock_rejection_reasons');
      const newReason = {
        id: reasons.length > 0 ? Math.max(...reasons.map(r => r.id)) + 1 : 1,
        name: request.body?.name || 'Unnamed Rejection Reason'
      };
      reasons.push(newReason);
      this.saveToDb('mock_rejection_reasons', reasons);
      return of(new HttpResponse({ status: 200, body: newReason })).pipe(delay(100));
    }
    if (url.includes('RejectionReason/Delete')) {
      let reasons = this.getFromDb('mock_rejection_reasons');
      const idToDelete = request.body?.id;
      reasons = reasons.filter(r => r.id !== idToDelete);
      this.saveToDb('mock_rejection_reasons', reasons);
      return of(new HttpResponse({ status: 200, body: true })).pipe(delay(100));
    }

    // Settings
    if (url.includes('Settings/GetList')) {
      const settings = this.getFromDb('mock_settings');
      return of(new HttpResponse({ status: 200, body: settings })).pipe(delay(100));
    }
    if (url.includes('Settings/Create')) {
      const settings = this.getFromDb('mock_settings');
      const modelBody = request.body?.settingsModel;
      const newSetting = {
        id: settings.length > 0 ? Math.max(...settings.map(s => s.id)) + 1 : 1,
        withdrawalPercentage: modelBody?.withdrawalPercentage || 10,
        servicePercentage: modelBody?.servicePercentage || 15,
        serviceProviderAvailability: modelBody?.ServiceProviderAvailability || 30
      };
      settings.push(newSetting);
      this.saveToDb('mock_settings', settings);
      return of(new HttpResponse({ status: 200, body: newSetting })).pipe(delay(100));
    }
    if (url.includes('Settings/Update')) {
      const settings = this.getFromDb('mock_settings');
      const modelBody = request.body?.settingsModel;
      const idToUpdate = modelBody?.id;
      const found = settings.find(s => s.id === idToUpdate) || settings[0];
      if (found) {
        found.withdrawalPercentage = modelBody?.withdrawalPercentage || found.withdrawalPercentage;
        found.servicePercentage = modelBody?.servicePercentage || found.servicePercentage;
        found.serviceProviderAvailability = modelBody?.ServiceProviderAvailability || found.serviceProviderAvailability;
        this.saveToDb('mock_settings', settings);
      }
      return of(new HttpResponse({ status: 200, body: found })).pipe(delay(100));
    }
    if (url.includes('Settings/Delete')) {
      let settings = this.getFromDb('mock_settings');
      const idToDelete = request.body?.id;
      settings = settings.filter(s => s.id !== idToDelete);
      this.saveToDb('mock_settings', settings);
      return of(new HttpResponse({ status: 200, body: true })).pipe(delay(100));
    }

    // Complaints
    if (url.includes('Complaint/GetAll')) {
      const complaints = this.getFromDb('mock_complaints');
      return of(new HttpResponse({ status: 200, body: complaints })).pipe(delay(100));
    }
    if (url.includes('Complaint/UpdateStatus')) {
      const complaints = this.getFromDb('mock_complaints');
      const idToUpdate = request.body?.id;
      const newStatusValue = request.body?.status === 2 ? 'Resolved' : 'In-Progress';
      const found = complaints.find(c => c.id === idToUpdate);
      if (found) {
        found.status = newStatusValue;
        this.saveToDb('mock_complaints', complaints);
      }
      return of(new HttpResponse({ status: 200, body: true })).pipe(delay(100));
    }

    // 5. ServiceProvider
    if (url.includes('ServiceProvider/GetAllList')) {
      const providers = this.getFromDb('mock_service_providers');
      return of(new HttpResponse({ status: 200, body: providers })).pipe(delay(150));
    }
    if (url.includes('ServiceProvider/GetById')) {
      const urlObj = new URL(url, 'http://dummy.com');
      const id = parseInt(urlObj.searchParams.get('Id') || '1', 10);
      const providers = this.getFromDb('mock_service_providers');
      const found = providers.find(p => p.id === id) || providers[0];

      // Build realistic details structure
      const details = {
        id: found.id,
        user: {
          id: found.userId,
          firstName: found.fullName.split(' ')[0],
          lastName: found.fullName.split(' ').slice(1).join(' ') || '',
          email: `${found.fullName.replace(/\s+/g, '').toLowerCase()}@example.com`,
          phoneNumber: found.businessPhoneNumber
        },
        bio: found.bio,
        gender: found.gender,
        profilePicture: found.profilePicture,
        businessAddress: found.businessAddress,
        businessPhoneNumber: found.businessPhoneNumber,
        dateOfBirth: '1987-03-12',
        streetAddress: found.streetAddress,
        city: found.city,
        state: found.state,
        zip: found.zip,
        remainingEarnings: 1540.00,
        totalEarnings: 3200.00,
        totalWithDrawls: 1660.00,
        completedAppointments: 24,
        remainingAppointments: 3,
        totalAppointments: 27,
        qualifications: [
          { id: 1, name: 'Ph.D. in Clinical Psychology', institutionName: 'Northwestern University', procurementYear: '2012' }
        ],
        serviceProviderTherapies: [
          { id: 1, ServiceProviderName: found.fullName, therapyName: 'Cognitive Behavioral Therapy (CBT)' }
        ],
        serviceProviderLicense: {
          id: 1,
          board: 'State Medical Board',
          number: 'LIC-99238472-X',
          issueDate: '2015-01-01',
          expiryDate: '2028-12-31',
          licenseType: { id: 1, name: 'State Clinical License' },
          frontImage: 'assets/images/user.png',
          backImage: 'assets/images/user.png'
        },
        specializations: [
          { id: 1, name: 'Adult Anxiety' },
          { id: 2, name: 'Stress Management' }
        ],
        appointments: [
          {
            id: 1,
            CustomerId: 1,
            CustomerProfile: 'assets/images/user.png',
            CustomerName: 'Alice Smith',
            ServiceProviderId: found.id,
            ServiceProviderName: found.fullName,
            CustomerServiceName: 'Initial Therapy Session',
            startTime: '10:00 AM',
            endTime: '11:00 AM',
            appointmentStatusName: 'Confirmed',
            date: '2026-05-28',
            isRejected: false,
            appointmentTypeName: 'In-office'
          }
        ],
        transactions: [
          { id: 1, totalAmount: 150.00, description: 'CBT stress management', updatedOn: '2026-05-24', CustomerName: 'Alice Smith', ServiceProviderName: found.fullName, CustomerService: { name: 'Therapy Session', charges: 150 } }
        ]
      };
      return of(new HttpResponse({ status: 200, body: details })).pipe(delay(100));
    }
    if (url.includes('ServiceProvider/ApproveServiceProvider')) {
      const providers = this.getFromDb('mock_service_providers');
      const reqBody = request.body?.approveServiceProvider;
      const providerId = reqBody?.ServiceProviderId;
      const found = providers.find(p => p.id === providerId);
      if (found) {
        found.isApproved = true;
        this.saveToDb('mock_service_providers', providers);
      }
      return of(new HttpResponse({ status: 200, body: found })).pipe(delay(100));
    }
    if (url.includes('ServiceProvider/DisapproveServiceProvider')) {
      const providers = this.getFromDb('mock_service_providers');
      const reqBody = request.body?.dissApproveServiceProviderModel;
      const providerId = reqBody?.ServiceProviderId;
      const found = providers.find(p => p.id === providerId);
      if (found) {
        found.isApproved = false;
        found.rejectionReason = reqBody?.rejectionReason;
        this.saveToDb('mock_service_providers', providers);
      }
      return of(new HttpResponse({ status: 200, body: found })).pipe(delay(100));
    }
    if (url.includes('ServiceProvider/Delete')) {
      let providers = this.getFromDb('mock_service_providers');
      const providerId = request.body?.id;
      providers = providers.filter(p => p.id !== providerId);
      this.saveToDb('mock_service_providers', providers);
      return of(new HttpResponse({ status: 200, body: true })).pipe(delay(100));
    }

    // 6. Customer
    if (url.includes('Customer/GetAllList')) {
      const customers = this.getFromDb('mock_customers');
      return of(new HttpResponse({ status: 200, body: customers })).pipe(delay(150));
    }
    if (url.includes('Customer/GetById')) {
      const urlObj = new URL(url, 'http://dummy.com');
      const id = parseInt(urlObj.searchParams.get('Id') || '1', 10);
      const customers = this.getFromDb('mock_customers');
      const found = customers.find(c => c.id === id) || customers[0];

      const details = {
        id: found.id,
        user: {
          firstName: found.User.FirstName,
          lastName: found.User.LastName,
          email: found.User.Email,
          phoneNumber: found.User.PhoneNumber
        },
        profilePicture: found.ProfilePicture,
        appointments: [
          {
            id: 1,
            customerId: found.id,
            customerProfile: found.ProfilePicture,
            customerName: `${found.User.FirstName} ${found.User.LastName}`,
            serviceProviderId: 1,
            serviceProviderName: 'Dr. Sarah Jenkins',
            customerServiceName: 'Cognitive Behavioral Therapy Session',
            startTime: new Date('2026-05-28T10:00:00Z'),
            endTime: new Date('2026-05-28T11:00:00Z'),
            appointmentStatusName: 'Confirmed',
            date: new Date('2026-05-28'),
            isRejected: false,
            appointmentTypeName: 'In-office',
            rejectionReasonName: '',
            rejectionDescription: ''
          }
        ],
        customerServiceRequests: [
          {
            title: 'Request for Work Stress Counseling',
            serviceType: { name: 'Cognitive Behavioral Therapy (CBT)' },
            description: 'Dealing with heavy burnout and need supportive CBT framework.',
            images: '',
            budget: 150,
            serviceRequestType: 1,
            service: null
          }
        ]
      };
      return of(new HttpResponse({ status: 200, body: details })).pipe(delay(100));
    }

    // 7. Order
    if (url.includes('Order/GetAll')) {
      const urlObj = new URL(url, 'http://dummy.com');
      const statusId = parseInt(urlObj.searchParams.get('statusId') || '0', 10);
      const orders = this.getFromDb('mock_orders');
      
      const filtered = statusId !== 0 ? orders.filter(o => o.orderStatus === statusId) : orders;
      return of(new HttpResponse({ status: 200, body: filtered })).pipe(delay(100));
    }

    // 8. WithdrawalRequest
    if (url.includes('WithdrawalRequest/GetList')) {
      const withdrawals = this.getFromDb('mock_withdrawal_requests');
      return of(new HttpResponse({ status: 200, body: withdrawals })).pipe(delay(100));
    }
    if (url.includes('WithdrawalRequest/Approve')) {
      const withdrawals = this.getFromDb('mock_withdrawal_requests');
      const withdrawalId = request.body?.withDrawalId;
      const found = withdrawals.find(w => w.id === withdrawalId);
      if (found) {
        found.withDrawalStatusId = 2; // Approved
        this.saveToDb('mock_withdrawal_requests', withdrawals);
      }
      return of(new HttpResponse({ status: 200, body: { ok: true, body: found } })).pipe(delay(100));
    }

    // Default Fallback
    return of(new HttpResponse({ status: 200, body: [] })).pipe(delay(50));
  }
}
