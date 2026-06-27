import { useEffect } from 'react';

interface InvoiceItem {
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
}

export default function PrintInvoice({ invoice }: { invoice: any }) {
    useEffect(() => {
        window.print();
    }, []);

    const statusLabel = invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', margin: '40px', color: '#333' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '20px' }}>
                <h1 style={{ margin: 0, fontSize: '22px', textTransform: 'uppercase' }}>Car Service Management System</h1>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#555' }}>123 Service Road, Auto Nagar, City - 600001</p>
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#555' }}>Phone: +91-9876543210 | Email: info@autocarepro.com</p>
            </div>

            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <h2 style={{ margin: 0, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px' }}>INVOICE</h2>
                <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0' }}>{invoice.invoice_number}</p>
                <p style={{ fontSize: '12px', color: '#555' }}>Status: {statusLabel}</p>
            </div>

            <div style={{ display: 'flex', gap: '40px', margin: '20px 0' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>
                        Customer Information
                    </div>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}><span style={{ color: '#888' }}>Name:</span> {invoice.customer?.full_name || '\u2014'}</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}><span style={{ color: '#888' }}>Phone:</span> {invoice.customer?.phone || '\u2014'}</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}><span style={{ color: '#888' }}>Email:</span> {invoice.customer?.email || '\u2014'}</p>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}><span style={{ color: '#888' }}>Address:</span> {invoice.customer?.address || '\u2014'}</p>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>
                        Invoice Info
                    </div>
                    <p style={{ fontSize: '12px', margin: '2px 0' }}><span style={{ color: '#888' }}>Date:</span> {invoice.created_at}</p>
                    {invoice.due_date && <p style={{ fontSize: '12px', margin: '2px 0' }}><span style={{ color: '#888' }}>Due Date:</span> {invoice.due_date}</p>}
                    <p style={{ fontSize: '12px', margin: '2px 0' }}><span style={{ color: '#888' }}>Status:</span> {statusLabel}</p>
                </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px', marginTop: '20px' }}>
                Items
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
                <thead>
                    <tr>
                        <th style={{ background: '#f3f4f6', textAlign: 'left', padding: '6px 8px', fontSize: '12px', border: '1px solid #ddd' }}>Description</th>
                        <th style={{ background: '#f3f4f6', textAlign: 'left', padding: '6px 8px', fontSize: '12px', border: '1px solid #ddd', width: '60px' }}>Qty</th>
                        <th style={{ background: '#f3f4f6', textAlign: 'right', padding: '6px 8px', fontSize: '12px', border: '1px solid #ddd', width: '100px' }}>Unit Price</th>
                        <th style={{ background: '#f3f4f6', textAlign: 'right', padding: '6px 8px', fontSize: '12px', border: '1px solid #ddd', width: '100px' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item: InvoiceItem, i: number) => (
                        <tr key={i}>
                            <td style={{ padding: '6px 8px', border: '1px solid #ddd', fontSize: '12px' }}>{item.description || '\u2014'}</td>
                            <td style={{ padding: '6px 8px', border: '1px solid #ddd', fontSize: '12px' }}>{item.quantity}</td>
                            <td style={{ padding: '6px 8px', border: '1px solid #ddd', fontSize: '12px', textAlign: 'right' }}>${item.unit_price.toFixed(2)}</td>
                            <td style={{ padding: '6px 8px', border: '1px solid #ddd', fontSize: '12px', textAlign: 'right' }}>${item.total.toFixed(2)}</td>
                        </tr>
                    ))}
                    {invoice.items.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '6px 8px', border: '1px solid #ddd', fontSize: '12px', color: '#999' }}>No items</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <p style={{ margin: '2px 0', fontSize: '12px' }}><span style={{ color: '#888' }}>Subtotal:</span> ${invoice.subtotal.toFixed(2)}</p>
                {invoice.discount > 0 && <p style={{ margin: '2px 0', fontSize: '12px' }}><span style={{ color: '#888' }}>Discount:</span> -${invoice.discount.toFixed(2)}</p>}
                {invoice.tax > 0 && <p style={{ margin: '2px 0', fontSize: '12px' }}><span style={{ color: '#888' }}>Tax:</span> +${invoice.tax.toFixed(2)}</p>}
                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '6px 0' }} />
                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '2px 0' }}><span style={{ color: '#888' }}>Grand Total:</span> ${invoice.total.toFixed(2)}</p>
            </div>

            <div style={{ textAlign: 'center', fontSize: '11px', color: '#888', borderTop: '1px solid #ccc', paddingTop: '15px', marginTop: '30px' }}>
                <p>This is a computer-generated invoice. No signature required.</p>
                <p>Generated on: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
        </div>
    );
}
