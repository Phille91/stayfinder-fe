export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  booking_id: string;
  property_id: string;
  guest_name: string;
  guest_id: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
  status: BookingStatus;
};

export type NewBooking = Omit<Booking, "booking_id" | "guest_id" | "status">;
