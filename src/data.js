export const contact = {
  address: '127/2 Kaha Romklao Road, Rat Phatthana Subdistrict, Saphan Sung District, Bangkok 10240, Thailand',
  phone: '+66 2 002 2899',
  email: 'adamimotorsthailand@gmail.com',
  weekday: '09:00 AM – 09:00 PM',
  weekend: '09:00 AM – 07:00 PM',
}

export const makers = ['Audi','Bentley','BMW','Bugatti','Chevrolet','Dodge','Ferrari','Ford','Honda','Hyundai','Jaguar','Jeep','Kia','Lamborghini','Land Rover','Lexus','Mazda','McLaren','Mercedes-Benz','Mitsubishi','Nissan','Peugeot','Porsche','Rolls-Royce','Suzuki','Tesla','Toyota','Volkswagen','Volvo']
export const types = ['Bus','Commuter','Coupe','Crew Cab','Double Cab','Dumper','Hatchback','Jeep','Mini Bus','Mini Truck','Mini Van','MPV','Pick Up','Pickup Truck','Sedan','Single Cab','Smart Cab','Sports','SUV','Tractor','Truck','Van','Wagon']

const legacyInventory = [
 ['Toyota','Hilux Travo','Double Cab',2025,36000,12000,'Automatic','Diesel','White'],
 ['Toyota','Hiace','Van',2024,56000,18000,'Automatic','Diesel','Pearl White'],
 ['Toyota','Commuter','Commuter',2019,36500,68000,'Automatic','Diesel','Silver'],
 ['Toyota','Commuter','Commuter',2020,25200,89000,'Automatic','Diesel','White'],
 ['Toyota','Commuter','Commuter',2019,24900,92000,'Manual','Diesel','Silver'],
 ['Toyota','Fortuner','SUV',2019,29000,71000,'Automatic','Diesel','Black'],
 ['Toyota','Fortuner','SUV',2019,29500,64000,'Automatic','Diesel','White'],
 ['Toyota','Revo','Double Cab',2019,20300,86000,'Automatic','Diesel','Grey'],
 ['Toyota','Revo Prerunner','Double Cab',2020,21600,72000,'Automatic','Diesel','Black'],
 ['Toyota','Hilux Revo','Single Cab',2019,14500,50000,'Automatic','Diesel','Brown'],
 ['Mitsubishi','Pajero','SUV',2012,13355,136000,'Automatic','Diesel','Black'],
 ['BMW','3 Series','Sedan',2015,18035,78000,'Automatic','Petrol','Blue'],
 ['Toyota','Sienta','MPV',2017,12230,84000,'Automatic','Petrol','Red'],
 ['Toyota','Yaris','Hatchback',2017,11260,75000,'Automatic','Petrol','White'],
 ['Mazda','Mazda 2','Sedan',2014,10940,98000,'Automatic','Petrol','Grey'],
 ['Toyota','Fortuner','SUV',2008,11900,168000,'Automatic','Diesel','Silver'],
 ['Nissan','Urvan','Van',2019,19800,82000,'Manual','Diesel','White'],
 ['Honda','HR-V','SUV',2018,17065,59000,'Automatic','Petrol','Black'],
 ['BMW','218i','Sedan',2017,17030,61000,'Automatic','Petrol','White'],
 ['BMW','X1','SUV',2017,18350,74000,'Automatic','Petrol','Black'],
 ['Mazda','CX-5','SUV',2017,17580,69000,'Automatic','Diesel','Red'],
 ['Toyota','Yaris','Hatchback',2025,23000,6000,'Automatic','Petrol','White'],
 ['Ford','Ranger','Pickup Truck',2023,31300,19000,'Automatic','Diesel','Orange'],
 ['Ford','Ranger','Double Cab',2013,17000,126000,'Manual','Diesel','Black'],
 ['Ford','Ranger Wildtrak','Pickup Truck',2022,30500,33000,'Automatic','Diesel','Grey'],
 ['Toyota','Hilux','Single Cab',2024,18500,12000,'Manual','Diesel','White'],
 ['Toyota','Revo 2.4E Prerunner','Smart Cab',2017,20600,94000,'Automatic','Diesel','Silver'],
 ['Toyota','Hilux Revo','Double Cab',2018,22300,81000,'Automatic','Diesel','Black'],
 ['Mitsubishi','Triton','Double Cab',2020,18900,76000,'Automatic','Diesel','White'],
 ['Toyota','Land Cruiser','SUV',2021,68400,42000,'Automatic','Diesel','Black'],
 ['Toyota','Revo','Double Cab',2020,19300,100000,'Automatic','Diesel','Arctic White'],
 ['Toyota','Fortuner','SUV',2019,28900,67000,'Automatic','Diesel','Pearl White'],
 ['Toyota','Hilux Revo','Double Cab',2020,23300,72000,'Automatic','Diesel','Grey'],
 ['Toyota','Revo Prerunner','Double Cab',2019,21600,87000,'Automatic','Diesel','White'],
 ['Nissan','Urvan','Mini Bus',2019,21000,97000,'Manual','Diesel','Silver'],
 ['Ford','Ranger','Pickup Truck',2022,29500,41000,'Automatic','Diesel','Blue'],
]

const pics = [
 'photo-1555215695-3004980ad54e','photo-1549317661-bd32c8ce0db2','photo-1503376780353-7e6692767b70',
 'photo-1492144534655-ae79c964c9d7','photo-1533473359331-0135ef1b58bf','photo-1606664515524-ed2f786a0bd6',
 'photo-1519641471654-76ce0107ad1b','photo-1552519507-da3b142c6e3d','photo-1542362567-b07e54358753'
]
const image = (i) => `https://images.unsplash.com/${pics[i % pics.length]}?auto=format&fit=crop&w=1100&q=85`
const featureGroups = {
  'Safety & Security':['ABS','SRS','Central Locking','Keyless Entry','Back Camera','Parking Pack'],
  'Infotainment & Electronics':['Navigation','Radio','AM/FM Radio','Smart Devices'],
  'Interior Comfort & Convenience':['Power Window','Power Steering','Power Mirror','Air Conditioning','Leather Seats'],
  'Exterior & Styling':['Alloy Wheels','Fog Lights','Rear Spoiler','Roof Rack'],
  'Drivetrain & Performance':['Turbo','2WD','4WD'],
  Miscellaneous:['One Owner','Non-Smoker','Spare Tire','Jack','Wheel Spanner'],
}

const legacyVehicles = legacyInventory.map((v,i) => ({
  id:i+1, slug:`${v[0]}-${v[1]}-${v[3]}-${i+1}`.toLowerCase().replaceAll(' ','-').replaceAll('.',''),
  maker:v[0], model:v[1], title:`${v[0]} ${v[1]}`, type:v[2], year:v[3], price:v[4], currency:'USD',
  mileage:v[5], engine:i%3===0?'2.8L':'2.4L', transmission:v[6], fuelType:v[7], color:v[8], steering:'Right',
  availableCountries:['Thailand'], status:i%13===0?'sold':i%9===0?'discounted':'available',
  featured:i<10, discounted:i%9===0,
  description:`A carefully selected ${v[3]} ${v[0]} ${v[1]} available from Bangkok with inspection and worldwide shipping support.`,
  images:[image(i),image(i+2),image(i+4)], features:featureGroups, createdAt:`2026-${String((i%6)+1).padStart(2,'0')}-${String((i%25)+1).padStart(2,'0')}`,
}))

export const vehicles = csvVehicles

export const services = [
 ['Car','Vehicle Sales & Procurement','Buy, sell, or source high-quality cars, including specialized Thai vehicles. We offer a diverse inventory to meet every preference and budget.'],
 ['Wrench','Custom Modifications','Upgrade your ride with performance and aesthetic enhancements. Our expert team transforms vehicles to match your vision.'],
 ['Settings','Accessories Installation','From essential add-ons to premium upgrades, we install it all. Enhance functionality and style with our professional installation services.'],
 ['Gauge','Maintenance & Repairs','Keep your vehicle in optimal condition with our comprehensive maintenance and repair services. Our skilled technicians ensure reliability and performance.'],
 ['ShieldCheck','Vehicle Inspection','Thorough pre-purchase inspections ensure quality and reliability, helping you make informed decisions with detailed vehicle assessment reports.'],
 ['Ship','Global Shipping','Seamless international vehicle delivery. We handle all logistics to ensure your vehicle arrives safely at its destination, anywhere in the world.'],
]

export const founders = [
 ['Aditsorn Gulikhandan Firdous Khan','Co-founder — Legal & Business Development','Builds transparent international partnerships and guides legal and business growth.'],
 ['Hamza Mohammad Yoshioka','Co-founder — Marketing, Sales & Shipping','Leads customer relationships, sales strategy and efficient global shipping.'],
 ['Rameez Zubair','Co-founder — Operations, Sales & Modifications','Oversees operations and vehicle transformations tailored to client needs.'],
 ['Behlum Mohammad Nadeem','Co-founder — Marketing, Operations & Sales','Connects marketing, operations and sales into a dependable client experience.'],
]
export const staff = [
 ['Shoaib Khokhar','Accounts Manager','Supports financial management, field operations and client service.'],
 ['Bibiasmina Arabshah','Accounts Specialist','Manages financial processes with accuracy and transparency.'],
 ['Basri','Vehicle Modification Specialist','Transforms vehicles for appearance, functionality and performance.'],
]

export const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n)
export const km = n => `${new Intl.NumberFormat('en-US').format(n)} km`
import { vehicles as csvVehicles } from './data/vehicles'
