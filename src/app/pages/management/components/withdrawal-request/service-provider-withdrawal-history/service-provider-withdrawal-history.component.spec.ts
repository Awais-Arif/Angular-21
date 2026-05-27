import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceProviderWithdrawalHistoryComponent } from './service-provider-withdrawal-history.component';

describe('ServiceProviderWithdrawalHistoryComponent', () => {
  let component: ServiceProviderWithdrawalHistoryComponent;
  let fixture: ComponentFixture<ServiceProviderWithdrawalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ServiceProviderWithdrawalHistoryComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderWithdrawalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
