"use client";

import { useActionState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { submitPayment } from "@/actions/payment";

const PaymentForm = ({ eventId }) => {
  const { auth } = useAuth();
  const [state, formAction, isPending] = useActionState(submitPayment, null);

  if (state?.success) {
    return (
      <div className="text-center py-8">
        <p className="text-green-400 text-lg font-semibold">Payment submitted!</p>
        <p className="text-[#9C9C9C] text-sm mt-2">
          A confirmation email has been sent. Click the link in the email to confirm your attendance.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="eventId" value={eventId} />
      <input type="hidden" name="userId" value={auth?.id ?? ""} />

      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={auth?.name ?? ""}
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={auth?.email ?? ""}
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">Card Number</label>
        <input
          type="text"
          id="card"
          name="card"
          placeholder="1234 5678 9012 3456"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="flex gap-4">
        <div className="my-4 space-y-2 flex-1">
          <label htmlFor="expiry" className="block">Expiry Date</label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            placeholder="MM/YY"
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
          />
        </div>

        <div className="my-4 space-y-2 flex-1">
          <label htmlFor="cvv" className="block">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="123"
            className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
          />
        </div>
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full my-8 bg-indigo-600 hover:bg-indigo-800 py-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
