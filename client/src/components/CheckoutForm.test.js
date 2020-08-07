import React from "react";
import { render, screen, waitFor, fireEvent} from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders",
() => {
    render(<CheckoutForm />);

    const header = screen.getByText(/checkout\sform/i);

    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details",
async () => {
    render(<CheckoutForm />);

    const firstName = screen.getByLabelText(/first\sname/i);
    const lastName = screen.getByLabelText(/last\sname/i);
    const address = screen.getByLabelText(/address/i);
    const city = screen.getByLabelText(/city/i);
    const state = screen.getByLabelText(/state/i);
    const zip = screen.getByLabelText(/zip/i);
    const button = screen.getByRole('button');

    fireEvent.change(firstName, {target: {value: 'Ryan'}});
    fireEvent.change(lastName, {target: {value: 'Lee'}});
    fireEvent.change(address, {target: {value: 'P. Sherman 42 Wallaby Way'}});
    fireEvent.change(city, {target: {value: 'Sydney'}});
    fireEvent.change(state, {target: {value: 'Australia'}});
    fireEvent.change(zip, {target: {value: '12345'}});

    fireEvent.click(button);

    waitFor(() => {
        expect(screen.getByTestId('successMessage')).toBeInTheDocument();
    })
});
