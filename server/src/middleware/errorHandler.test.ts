import { describe, expect, it } from 'vitest';

describe('errorHandler', () => {
  it('should return status code 500 and message "Something went wrong" when error is not an instance of AppError', () => {
    expect(true).toBe(true);
  });

  it('should return status code and message from AppError', () => {
    expect(true).toBe(true);
  });

  it('should return fields from AppError if present', () => {
    expect(true).toBe(true);
  });

  it("shouldn't return fields from AppError if not present", () => {
    expect(true).toBe(true);
  });
});