<h2>Demo Project for HealthOS Intern</h2>
It is react project created using <code>npx create-react-app</code> command and using typescript template.

<h3>How to run the project</h3>
At this moment, backend is not implemented. To run and view the project project, follow the commands below: <br>
<code>git clone https://github.com/Moon422/healthos-demo.git</code><br>
<code>cd healthos-demo</code><br>
<code>npm install</code><br>
<code>npm start</code>
<h4>Credentials</h4>
Normal User/Customer:
<ul>
  <li>Phone: 01700000000</li>
  <li>Password: 123456</li>
</ul>
Admin:
<ul>
  <li>Phone: 01700000001</li>
  <li>Password: 123456</li>
</ul>

<h3>Login/Registration Page</h3>
This page will be displayed if user have not logged into his/her account yet from the current browser. From this page, he/she can login as well as create a new account if he/she does not have one. User registration is functional. However, only normal users can register from here. Admin registration is not implemented.

![Screenshot 2022-12-22 at 13-17-11 React App](https://user-images.githubusercontent.com/90880886/209190095-6cdddba8-98f9-4483-ab4b-0ae03f895c5f.png)

<h3>User Home Page</h3>
You either use the registration page to create a new account or use the dummy accout. Credentials for dummy account are given below:
<ul>
<li>Phone: 01700000000</li>
<li>Password: 123456</li>
</ul>
<img src="https://user-images.githubusercontent.com/90880886/209911892-0458385f-40e3-4ed5-9558-3f8e0d03b3e8.png" />
At the top, we have two navigation buttons: one for the product page and other for the cart page. All the products are displayed at the product page and all the products added to cart are displayed at the cart page. Each product item at the prodcut page is card that displays product image, product name, description, products in stock and price.

<h4>Product Details Page</h4>
<img src="https://github.com/Moon422/healthos-demo/blob/main/Screenshot%202022-12-29%20at%2013-23-32%20React%20App.png?raw=true" />
In order to buy a product, we have to go to product details page and enter the quantity and click on "Add to Cart" button.

<h3>User Cart Page</h3>
<img src="https://github.com/Moon422/healthos-demo/blob/main/Screenshot%202022-12-29%20at%2013-27-14%20React%20App.png?raw=true"/>
Cart page displays all the products that are added to the cart. Clicking on "Remove" button will the remove the item from cart and clicking on "Place Order" button will place the order.

<h3>Admin Dashboard</h3>
In our admin dashboard, navigation panel has four buttons: home, customers, orders and products. Home page has not been completed yet.

<h3>Admin Customer Page</h3>
<img src="https://github.com/Moon422/healthos-demo/blob/main/Screenshot%202022-12-29%20at%2013-32-00%20React%20App.png?raw=true" />
Customer page shows list the registered customers and their phone numbers and form to add a new customer. In our customer list, each of the rows are forms that can be used to update existing customer details.

<h3>Admin Order Page</h3>
It displays all the order that has been placed so far
<img src="https://github.com/Moon422/healthos-demo/blob/main/Screenshot%202022-12-29%20at%2013-37-27%20React%20App.png?raw=true" />

<h3>Admin Product Page</h3>
It displays all the products and a form to add new product
<img src="https://github.com/Moon422/healthos-demo/blob/main/Screenshot%202022-12-29%20at%2013-45-36%20React%20App.png?raw=true" />
Each of the rows in the product list is a form that can be used to update a product information or remove it.
