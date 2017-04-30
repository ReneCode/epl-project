import { TestBed, inject } from "@angular/core/testing";

import { RedliningService } from "./redlining.service";

describe("RedliningService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedliningService]
    });
  });

  it("should ...", inject([RedliningService], (service: RedliningService) => {
    expect(service).toBeTruthy();
  }));
});
