open angular terminal, server terminal , mongod server 

Terminal 
=> MKDIR ProjectFolder //this will be your full MEAN project 
=> CD into projectFolder
=> npm init -y 
=> npm install express body-parser mongoose express-session --save 
=> TOUCH server.js file 
=> MKDIR server Folder //could be name anything you want. server makes sense since its all backend work 
=> CD server Folder 
	=> MKDIR config folder 
		=> TOUCH mongoose.js file
		=> TOUCH routes.js file 
	=> MKDIR controllers folder 
		=> db_names.js
	=>MKDIR models 
		=>db_name.js //model file are singular 

=> ng new client --routing  //which will create your angular folder as well as your routing module.  
=> CD client/src/app - app.component 
		- app.modules.ts
		- app-routing.modules.ts  
	- ng g c main names component ( plurals )
=> CD main name component  
	- ng generate service mainComponent/name (singluar) -- name.service.ts
	- ng generate clasS mainComponent/name ( singular ) -- name.ts 
	- ng g c subComponent  mainComponent/subComponent


Connecting frontend to backend

=> CD to Angular folder "client"  
=> ng serve run on localhost:4200 //test to see all app pages are working
=> control c out of ng serve. 
=> run ng build -w  which will create dist folder. this will remain open while working on the app

=> open new terminal and run  nodemon server.js -Keep this terminal open all times while working on the project
=> open new terminal and run sudo mongod 
=> open new terminal and run mongo  



SUBLIME  - open project folder 

1. => server.js file make the necessary edits 

		const express = require("express")
		const path = require("path")

		const app = express()
		const bodyParser = require("body-parser")
		const session = require("express-session")

		const PORT = 8000

		app.use(bodyParser.json())
		app.use(express.static(path.join(__dirname, "./client/dist")))

		app.use(session({
			secret: "really really secret",
			resave: false,
			saveUninitialized: true
		}))

		require("./server/config/mongoose.js")

		require("./server/config/routes.js")(app)

		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`)
		})

2. => config/routes.js - this will connect angular to express on localhost:8000
		
		const path= require("path")

		module.exports = app => {
			
		}
		//you'll should see your page load and the angular 'app works!''

	=> User log in regristation is just the user being able to log in and their name is saved into session. If they refresh it will remember their log in. 
	=> If haven''t done so. create the necessary components in the APP component, create clasS.ts and service ts (request and response cycle, mediator between angular and express)  
	
3. => App.module.ts 
		import { BrowserModule } from '@angular/platform-browser';
		import { NgModule } from '@angular/core';
	ADD	-import { FormsModule } from '@angular/forms';
	ADD	-import { HttpModule } from '@angular/http';

		import { AppRoutingModule } from './app-routing.module';
		import { AppComponent } from './app.component';
		import { UsersComponent } from './users/users.component';
		import { UsersLoginComponent } from './users/users-login/users-login.component';
		import { UsersDashboardComponent } from './users/users-dashboard/users-dashboard.component';

	ADD	-import { UserService } from "./users/user.service"

		@NgModule({
		  declarations: [
		    AppComponent,
		    UsersComponent,
		    UsersLoginComponent,
		    UsersDashboardComponent
		  ],
		  imports: [
		    BrowserModule,
	ADD	   - FormsModule,
	ADD	   - HttpModule,
		    AppRoutingModule
		  ],
	ADD	 - providers: [UserService],
		  bootstrap: [AppComponent]
		})
		export class AppModule { }

4. => App.component.html 
	<h1>USERS</h1>
	<router-outlet></router-outlet>


5. => App-routing modules.ts -add so it will start the routing connection to all the pages, only the log in page will load. not the dashboard. express did not find /dashbaord to handle to handle.  

		import { NgModule } from '@angular/core';
		import { Routes, RouterModule } from '@angular/router';

	ADD -import { UsersLoginComponent } from "./users/users-login/users-login.component"
	ADD -import { UsersDashboardComponent } from "./users/users-dashboard/users-dashboard.component"

		const routes: Routes = [
	ADD-  { path: 'login', component: UsersLoginComponent },
	ADD-  { path: 'dashboard', component: UsersDashboardComponent },
	ADD-  { path: '**', redirectTo: '/login'}
		];

		@NgModule({
		  imports: [RouterModule.forRoot(routes)],
		  exports: [RouterModule]
		})
		export class AppRoutingModule { }

6. => server/config/routes.js 

	const path = require("path")
		module.exports = app =>{
			app.get("*", (req, res) => res.sendFile(path.resolve("./client/dist/index.html")))
		}

7. => App-Routing Modules.ts 
	add route to all the pages needed. 

	import { NgModule } from '@angular/core';
	import { Routes, RouterModule } from '@angular/router';

	import { UsersLoginComponent } from "./users/users-login/users-login.component"
	import { UsersDashboardComponent } from "./users/users-dashboard/users-dashboard.component"

	const routes: Routes = [
	  { path: 'login', component: UsersLoginComponent },
	  { path: 'dashboard', component: UsersDashboardComponent },
	  { path: '**', redirectTo: '/login'}
	];

	@NgModule({
	  imports: [RouterModule.forRoot(routes)],
	  exports: [RouterModule]
	})
	export class AppRoutingModule { }

8. => create user.ts model etc.  

	export class User {
	  _id: string
	  name: string
	  createdAt: Date
	  updatedAt: Date
	}


9. =>  HTML component create your form. make sure to add validation on the form. 

	<form #new_car_form="ngForm" (submit)="create_car()">
	<p>Make: <input type="text" name="make" [(ngModel)]="new_car.make" required minlength="2" #new_car_make="ngModel" [ngClass]="{alert: false}" >{{new_car_make.errors | json}}
		<span *ngIf="new_car_make.errors">ERROR!!!</span>
		<span *ngIf="new_car_make.errors?.required">This field is required</span> 
		<span *ngIf="new_car_make.errors?.minlength">The minimum requred length is {{new_car_make.errors.minlength.requiredLength}} (you entered {{new_car_make.errors.minlength.actualLength}})</span>
		</p>



	<p>Year: <input type="text" name="year" [(ngModel)]="new_car.year"></p>
	<p>Model: <input type="text" name="model" [(ngModel)]="new_car.model"></p>
	<p><input type="submit" name="submit" value="Create Car" [disabled]="!new_car_form.valid"></p>
	</form>


10. => user.login.component page

import { User } from "./../user"
import { UserService } from "./../user.service"

	new_user : User 

	constructor(private user_service: UserService ) 

	ngOnInit(){
		this.new_user = new User 
	}

	login(){
		this.user_service.create(this.new_user)

	}


11. => user.service.ts  file 

	import { Http } from "@angular/http"
	import "rxjs"
	import { User } from "./user"

	constructor (private http: Http){}

	create( new_user : User )
	this.http.post("/login", new_user) //"/login" name you just made it up right now. jump to express to create the login in. 

12. => express routes.js 
	const users = require('./../controllers/users.js')
	app.post('/login', users.login) 
	app.get('get_all_users', users.get_all)


13. => constrollers - users.js file

	const users = [{name: "hanh", createdat: new Date()}, {name:'Ha', createdat: new Data()}]

	module.exports ={
		get_all:(req, res) => { //test that the dummy user are all showing 
			res.json(users)
		}
		login: (req, res) => {
			users.push({name: req.body.name, createdAt: new Date()})
			req.session.user = req.body.name //create and save the user into session 
			res.json(true) //sending true as a string. response back something to the user that they ahve been created and saved. it have to receive a response to be able to run the next step

		}
	}

14. => SERVICE.TS 
	import 'rxjs' to be able to use .map and .toPromise , 
	.map when an even trigger obserable that transform the data but leave the outer obserable and outer obserabel turn into a toPromise. 
	ToPromise only capute hte data once 
	take that string into a javascript 

	create( new_user : User )
	return this.http.post("/login", new_user).map(data => data.json()).toPromise()

12. => back to users.login components to add a promise 
	-edit the login() function with a promise 

		login(){
		this.user_service.create(this.new_user)
			.then(() => console.log("Register works!"))
			.catch(err => console.log("user login error", err))
		}

// .then reqiures a callback function if you leave a ()=> it will work 
13. => go to /get_all_users to see all the users in the array 


	setting up the dashboard of all the users. when hte users the log in it redirect htem to user dashboard
	if you look up dashboard without login it redirect you to the log in 


14. => users-login component.ts 
	import {Router} from @angular/cli

	constructor (private router: Router) //add 

	login(){
		this.user_service.create(this.new_user)
		.then(() => this.router.navigate(['/dashboard']) 
		.catch(err=> console.log("user log in ", err))
	}
 

15. => dashboard html.ts in angular page 
	insert table 
		<table>
		<tr>
		<th>#</th>
		<th>Name</th>
		<th>ID</th>
		<th>createdat</th>
		</tr>

		<tr *ngFor="let user of users, let idx = index" >
		<td>{{ idx +1 }}<td> // will incurment the counter for number of users 
		<td>{{user.name}}</td>
		<td>{{user._id}}</td>
		<td> {{ user.CreatedAT | date: "medium" }}</td>
		</tr>
	</table>
	 
	 if.... optional to show user 

	{{ users[0] |json }} will only pull up user[0] in the dashboard page.  will throw an error b/c the system will not read this right away. it will take a couple of seconds later to load. 
	to avoid it is set a default value. 

	this.users = [new User] in the user.dashboard.ts
	<div *ngIf= > 
	{{ users[0] |json }} 
	</div>
	will only see the headers and not the data 

16. => user-dashbaord component.ts 

import { User }
import { UserServices }

users: Array<User> 

constructor (private user_service: UserService ) /constructor files first before teh ngOnInit 

ngOnInit(){
this.user_service.get_all() 
.then(users => this.users = users )
.catch(err=> consoloe.log("All all user errors", err)) //

}


17. => need to go to service .ts 
	to add this.user_service.get_all() method 

	get_all(){
		return this.http.get("/get_all_users").map(data=> data.json()).toPromise()
	}


*************check if the user is log in, if not rediect them to the log in page *************

dashbaord compoent.ts 

import { Router }

constructor (,private router: Router){} //add to the constructor. 
ngOnInit(){
	this.user_service.am_i_logged_in(){
		.then(user => console.log(user))
		.catch(() => this.router.navigate(["/login"]))
	}
}

users.service.ts add am_i_logged_in()

am_i_logged_in(){

	return this.http.get("/am_i_logged_in").map(data=>data.json().toPromise()
}

route.js

app.get("/am_i_logged_in", am_i_logged_in )


users.js controller to check if the user is logged in to view the page 

am_i_logged_in: (req, res){
	if(req.session.name){
		res.json(req.session.user)
	}else{
		res.status(401).json(false) //return an error response will show an unauthorized message on console 
	}
	}
}

if the user is logged in, if they refresh the page they will remain on the dashboard page. 

logout function ---- 
html page <a href="/logout"

routes.js

app.get("/logout", users.logout)

users.js 

logout:(req, res)=> {
	req.session.destroy()
	res.redirect("/login") //dont need to do anything in angular for log on. basic link in express will work. trigger a page refresh whichi s okay b/c they are logging out. 
}

mongoose time!!!!!!! 
shouldnt need to hcange anything in angular. 

go to mongoose.js 

name the file in the mongoose.connect("mongodb://localhost/users201710") //users201710 is the project folder name 



go to models.js file - name - user.js 

const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
	name: String, //can add vadildation 

}, {timestamps:true})

mongoose.model("User", UserSchema) 

go to users.js 

const mongoose = require("mongoose")
const User = mongoose.model("User")

catched the get_all method- 

get_all:(req, res)=> {
	User.find({})
	.then(users => res.json(users))
	.catch(err => {
		console.log("user.find error" , err)
		res.status(500).json(err)
	})
}



change login so it connect with mongoose, it will save the information into the database.  

login: (req, res) => { //will check if there is a user in the database iwht hte name and if not it will create a new user. 

	User.findOne({name: req.body.name})
	.then(user => {
		if(user){
			req.session.user = user 
			res.json(true)
		}else{
			let new_user = new User(req.body) 
			new_user.save()
			.then(() => {
				req.session.users = new_user
				res.json(true)
			})
			.catch(err => {
				console.log("user.find error" , err)
				res.status(500).json(err)
			})
		}
	})	
},

if there are two of the same name in the dashboard . it will find the first match name that was created in the system.   


if you want to order the the list you should do it in the front end. 


18. ************OPTIONAL CUSTOM PIPES ***************

on your app level component
-ng g pipe pipeName (example pipeName = filter)

filter.pipe.ts 

import { Pipe, PipeTransform } from '@angular/core';
import { Car } from "./car"
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(cars: Array<Car>, search_text: string): Array<Car> {
  if(!search_text){ return cars } //if not search text then return cars 

  search_text = search_text.toLowerCase() //set search string to lower case all the words to filter 

return cars.filter(car => car.make.toLowerCase().includes(search_text) || car.model.toLowerCase().includes(search_text))
  }
}

- pull up the component html you would like to add your pipe. 

// this will pull up a search input box that user can input to filter. 
<p><input type="text" name="search" [(ngModel)]="search" placeholder="Search...."></p> 


// below <> is what you want the search input to filter. The example below is searching through the list cars. 
<*ngFor="let car of cars | filter: search"></>


