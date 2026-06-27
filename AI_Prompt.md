AI Prompt

Auto Parts and Car Services Management System

E-Commerce Auto Parts and Car Services Management System Database Schema

- Create models based on these schema
- Generate migrations
- Create seeders 

Authentication & Users
users
├──`role` enum('admin','customer', 'staff') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
├──last_login_at
Categories & Brands
categories
├── id (PK)
├── parent_id (FK → categories.id, nullable)
├── name
├── slug
├── image
├── description
├── status
├── created_at
└── updated_at
brands
├── id (PK)
├── name
├── slug
├── logo
├── description
├── status
├── created_at
└── updated_at
Vehicle Management
vehicle_makes
├── id (PK)
├── name
├── status
├── created_at
└── updated_at
vehicle_models
├── id (PK)
├── make_id (FK → vehicle_makes.id)
├── name
├── status
├── created_at
└── updated_at
vehicles
├── id (PK)
├── customer_id (FK → customers.id)
├── make_id (FK → vehicle_makes.id)
├── model_id (FK → vehicle_models.id)
├── year
├── vin
├── registration_number
├── engine_type
├── mileage
├── fuel_type
├── color
├── status
├── created_at
└── updated_at
Products
products
├── id (PK)
├── category_id (FK → categories.id)
├── brand_id (FK → brands.id)
├── sku (unique)
├── barcode
├── name
├── slug
├── description
├── cost_price
├── selling_price
├── discount_type
├── discount_value
├── tax_rate
├── minimum_stock
├── weight
├── status
├── created_at
└── updated_at
product_images
├── id (PK)
├── product_id (FK → products.id)
├── image
├── sort_order
├── created_at
└── updated_at
product_specifications
├── id (PK)
├── product_id (FK → products.id)
├── specification_name
├── specification_value
├── created_at
└── updated_at
product_vehicle_compatibilities
├── id (PK)
├── product_id (FK → products.id)
├── make_id (FK → vehicle_makes.id)
├── model_id (FK → vehicle_models.id)
├── year_from
├── year_to
├── created_at
└── updated_at
Customers
customers
├── id (PK)
├── user_id (FK → users.id, nullable)
├── customer_code
├── full_name
├── email
├── phone
├── address
├── loyalty_points
├── wallet_balance
├── notes
├── status
├── created_at
└── updated_at
customer_wallet_transactions
├── id (PK)
├── customer_id (FK → customers.id)
├── amount
├── transaction_type
├── reference
├── notes
├── created_at
└── updated_at
Service Booking
bookings
├── id (PK)
├── booking_number
├── customer_id (FK → customers.id)
├── vehicle_id (FK → vehicles.id)
├── booking_date
├── service_type
├── notes
├── status
├── created_at
└── updated_at
service_packages
├── id (PK)
├── name
├── description
├── price
├── duration
├── status
├── created_at
└── updated_at
Workshop Management
job_cards
├── id (PK)
├── booking_id (FK → bookings.id)
├── vehicle_id (FK → vehicles.id)
├── customer_id (FK → customers.id)
├── job_number
├── inspection_notes
├── estimated_cost
├── status
├── created_at
└── updated_at
mechanic_assignments
├── id (PK)
├── job_card_id (FK → job_cards.id)
├── mechanic_id (FK → users.id)
├── assigned_at
├── completed_at
├── status
├── created_at
└── updated_at
repair_orders
├── id (PK)
├── job_card_id (FK → job_cards.id)
├── labor_cost
├── parts_cost
├── total_cost
├── notes
├── status
├── created_at
└── updated_at
repair_order_parts
├── id (PK)
├── repair_order_id (FK → repair_orders.id)
├── product_id (FK → products.id)
├── quantity
├── unit_price
├── total
├── created_at
└── updated_at
vehicle_inspections
├── id (PK)
├── job_card_id (FK → job_cards.id)
├── inspector_id (FK → users.id)
├── inspection_date
├── report
├── status
├── created_at
└── updated_at
POS & Sales
sales
├── id (PK)
├── invoice_number
├── customer_id (FK → customers.id)
├── warehouse_id (FK → warehouses.id)
├── subtotal
├── discount
├── tax
├── total
├── payment_status
├── sale_date
├── created_by (FK → users.id)
├── created_at
└── updated_at
sale_items
├── id (PK)
├── sale_id (FK → sales.id)
├── product_id (FK → products.id)
├── quantity
├── unit_price
├── discount
├── tax
├── total
├── created_at
└── updated_at
sale_returns
├── id (PK)
├── sale_id (FK → sales.id)
├── return_number
├── refund_amount
├── reason
├── created_at
└── updated_at
Payments
payments
├── id (PK)
├── customer_id (FK → customers.id)
├── sale_id (FK → sales.id, nullable)
├── invoice_id (FK → invoices.id, nullable)
├── amount
├── payment_method
├── transaction_reference
├── payment_date
├── notes
├── created_at
└── updated_at
Invoicing
invoices
├── id (PK)
├── invoice_number
├── customer_id (FK → customers.id)
├── invoice_type
├── subtotal
├── discount
├── tax
├── total
├── due_date
├── status
├── created_at
└── updated_at
invoice_items
├── id (PK)
├── invoice_id (FK → invoices.id)
├── item_type
├── item_id
├── description
├── quantity
├── unit_price
├── total
├── created_at
└── updated_at
E-Commerce
carts
├── id (PK)
├── customer_id (FK → customers.id)
├── created_at
└── updated_at
cart_items
├── id (PK)
├── cart_id (FK → carts.id)
├── product_id (FK → products.id)
├── quantity
├── created_at
└── updated_at
wishlists
├── id (PK)
├── customer_id (FK → customers.id)
├── product_id (FK → products.id)
├── created_at
└── updated_at
coupons
├── id (PK)
├── code
├── discount_type
├── discount_value
├── start_date
├── end_date
├── usage_limit
├── status
├── created_at
└── updated_at
orders
├── id (PK)
├── customer_id (FK → customers.id)
├── coupon_id (FK → coupons.id, nullable)
├── order_number
├── subtotal
├── discount
├── tax
├── shipping_fee
├── total
├── payment_status
├── order_status
├── created_at
└── updated_at
order_items
├── id (PK)
├── order_id (FK → orders.id)
├── product_id (FK → products.id)
├── quantity
├── unit_price
├── total
├── created_at
└── updated_at
reviews
├── id (PK)
├── customer_id (FK → customers.id)
├── product_id (FK → products.id)
├── rating
├── review
├── status
├── created_at
└── updated_at
Notifications
notifications
├── id (PK)
├── user_id (FK → users.id)
├── title
├── message
├── channel
├── status
├── sent_at
├── created_at
└── updated_at
System Settings
settings
├── id (PK)
├── key
├── value
├── group
├── created_at
└── updated_at
data
    1
        key: stripe_publishable_key
        group: payment
        value: pk_test
    2
        key: stripe_secret_key
        group: payment
        value: sk_test
    3
        key: paypal_client_id
        group: payment
        value: test
    4
        key: paypal_client_secret
        group: payment
        value: test
site_name
site_logo
support_email
support_phone
currency
tax_rate
shipping_fee

remove the existing dashboard http://127.0.0.1:8000/dashboard and Create a dashboard page for 
(Admin) 
a role-based multi-dashboard RoleMiddleware with ProtectedRoute 
Route::middleware('role:admin')->get('/admin/dashboard', function () { return 'Admin Dashboard'; });
Route::middleware('role:customer')->get('/my-account', function () { return 'My Account'; });

Create Dashboard Page for dashboad admin http://127.0.0.1:8000/admin/dashboard
Display real-time statistics:
Total Revenue
Today Order
Yesterday Orders
Total Order
Weekly Sales
Sales Analytic
Best Selling Products
Recent Order in table with photo of product
Use charts (Chart.js) for dashboard stats

generate 50 additional records realistic data for the database table products 
generate 20 additional records for customer realistic data for the database table users 
generate 50 additional records realistic data for the database table orders 

Create Products Page this is for admin role http://127.0.0.1:8000/admin/products
Products (Manage your products inventory)
-export (export to CSV, export to json)
View all Products (paginated, searchable)
Add Products (new page, upload photo)
Edit Products details (update photo)
View Product (Product Details page, photo large left right information with edit button)
Delete Products (delete photo)       

Create Orders Page this is for admin role http://127.0.0.1:8000/admin/orders
Manage customer orders - Download all orders in csv file
View all Orders (paginated, searchable)
Edit Order
Orders details
Order Tracking
Delete Orders
print receipt

Create Customers Page this is for admin role http://127.0.0.1:8000/admin/customers
View all Customers (paginated, searchable)
Create new Customers
Edit Customers details
view (new page Customer Order List table)
Delete Customers

Create Category Page this is for admin role
View all categories (paginated, searchable)
Create new categories
Edit categories details
Delete categories

Create brands Page this is for admin role
View all brands (paginated, searchable)
Create new brands
Edit brands details
Delete brands

Create coupons Page this is for admin role
View all coupons (paginated, searchable)
Create new coupons
Edit coupons details
Delete coupons

Create Reviews Star Rating this is for admin role
View all reviews (paginated, searchable)
Edit reviews details
Delete reviews

Create settings Page this is for admin role
View all settings (paginated, searchable)
Create new settings
Edit settings details
Delete settings

add a Section heading called SERVICES in the app-sidebar after SERVICES add services with link http://127.0.0.1:8000/admin/services

Create services Page this is for admin role http://127.0.0.1:8000/admin/services
View all services (paginated, searchable)
Create new services
Edit services details
Delete services

Create Work Orders Page after services this is for admin role http://127.0.0.1:8000/admin/work_orders
View all Work Orders (paginated, searchable)
Create new Work Orders
Edit Work Orders details
Viw Details 
Delete Work Orders

Create Employees Page after Settings this is for admin role http://127.0.0.1:8000/admin/employees
View all Employees  (paginated, searchable)
Create new Employees
Edit Employees details
Viw Details 
Delete Employees

Create Booking Page after Work Orders this is for admin role http://127.0.0.1:8000/admin/booking
View all Booking  (paginated, searchable)
Edit Booking details
Viw Details 
Delete Booking

for this page http://127.0.0.1:8000/admin/work-orders/1 add Parts Used in table (part name, Qty, unit price, total) add Charges Summary (labor charges, Parts Charges, total Charges) add part form (Part, qty, unit price, add button) add Notes textbox(enter service notes) Update status (waiting, assigned in Progress, completed, canelled) add Print Button to print Invoice add also Generate Invoice 

add a Section heading called BILLING in the app-sidebar after BILLING add POS with link http://127.0.0.1:8000/admin/point-of-sales

Create POS Point of sale Page after POS http://127.0.0.1:8000/admin/point-of-sales 
Create Invoices Page http://127.0.0.1:8000/admin/invoices
View all Invoices  (paginated, searchable)
Create new Invoices
Viw Details 
Delete Invoices
Print Invoices
======================================================================
Design a Premium automotive ecommerce homepage welcome.tsx

Style:
- Luxury automotive
- Dark mode
- Premium performance car aesthetic
- Editorial layout
- Large photography
- Minimalist UI
- Modern ecommerce

Color Palette:
Background #0D0D0D
Surface #171717
Primary Orange #FF4D00
Text White #FFFFFF
Secondary Text #B5B5B5

Typography:
Montserrat Bold for headings
Inter for body

Header:
- Sticky navigation
- Search
- Wishlist
- Account
- Shopping cart
- Mega menu

Hero:
- Fullscreen automotive banner
- Performance vehicle photography
- Large headline
- CTA button
- Smooth zoom animation
- Auto Repair Service with Accessories
- Make your car Hassle Free

Sections:
1. Vehicle Categories
2. Featured Products
3. Best Sellers
4. Performance Parts Collection
5. Brand Showcase
6. Vehicle Finder
7. Promotional Banner
8. Customer Reviews
9. Instagram Gallery
10. Newsletter Signup

Product Cards:
- Image hover swap
- Wishlist button
- Quick View
- Add to Cart
- Elevated hover shadow

Animations:
- Fade-up on scroll
- Smooth page transitions
- Image zoom hover
- Animated mega menu
- Sticky shrinking header

Footer:
- Four-column layout
- Shop links
- Support links
- Newsletter
- Social media
- Payment methods

Overall feel:
Premium, fast, modern, luxury automotive ecommerce experience.

create book an appointment page http://127.0.0.1:8000/book-an-appointment
create about us page http://127.0.0.1:8000/about-us
create contact us page http://127.0.0.1:8000/contact-us

Create collections page http://127.0.0.1:8000/collections/engine-drivetrain engine-drivetrain is slug database category
upate collections page http://127.0.0.1:8000/collections/engine-drivetrain
1 Main Layout Structure:

    Use a two-column layout
    Left sidebar for filters
    Right content area for products

 2  Sidebar Filter Section:
    Include:

    Product categories
    Price range slider
    Brand filters
    Ratings filter

    Sidebar Design:

    White cards with soft shadow
    Sticky sidebar on desktop
    Accordion sections
    Thin dividers
    Modern checkbox styling
    Minimal icon usage

    Top Toolbar Section:
    Include:

    Product count text
    Sorting dropdown
    Grid/list toggle buttons
    Search input optional
    Clean horizontal alignment
    Subtle bottom border

    Product Grid:

    3 or 4-column responsive card layout
    Equal card heights
    Consistent spacing and alignment
    Masonry-like visual rhythm without actual masonry

3 Product Card Design:
    Each card should include:

    Product image
    Hover image swap
    Sale badge / discount badge
    Wishlist icon
    Quick view button
    Product category
    Product title
    Star ratings
    Current price
    Old price
    Add to cart button

    Card UI:

    Rounded corners
    Soft shadow
    Hover lift animation
    Image zoom on hover
    Buttons fade in on hover
    Clean typography
    Modern ecommerce interactions

Create a product page details http://127.0.0.1:8000/product-details/bosch-oil-filter-p363 bosch-oil-filter-p363 is slug from products database 

- Product Showcase Section
    Two-column responsive layout
    Large product gallery on the left
    Product information panel on the right
    Sticky product image gallery behavior on scroll
    Vertical thumbnail gallery beside main image
    Smooth image switching interaction
    Light zoom-on-hover effect
    Large clean product imagery with soft gray background container

- Product Information Area
    Include:
    Product category label
    Large bold product title
    Rating stars with review count
    Pricing layout with sale price + original price
    Short product description paragraph
    Quantity selector with plus/minus buttons
    Large primary “Add to Cart” button
    Secondary “Buy Now” button
    Wishlist and compare icons
    SKU/meta information
    Social sharing icons

- Product Details Tabs Section
    Tabbed content layout with:
    Description
    Additional Information
    Reviews

    Tab Design:

    Minimal horizontal tab navigation
    Active tab underline animation
    Smooth content transitions
    Large readable content spacing

- You Might Also Like Products Section
    Grid layout with 4 related products
    Card-based design
    Hover image swap effect
    Floating action buttons on hover
    Product badges like “Sale” or “New”
    Consistent product card spacing
    Minimal typography hierarchy

Create a customer login signup page for customer http://127.0.0.1:8000/customer/login

customer my account http://127.0.0.1:8000/my-account
with landing-navigation and landing-footer 
-my details 
-notifications
-my order   
-wishlist
-billing address 
-my cart   

Create checkout page http://127.0.0.1:8000/checkout

for this page http://127.0.0.1:8000/checkout
integrate Stripe payment in test mode.
1. Install Stripe PHP package
2. Install Stripe.js for frontend
3. Integrate Stripe payment

