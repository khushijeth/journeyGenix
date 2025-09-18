
from . import models
from django.shortcuts import render , redirect
import time
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .forms import ItineraryForm



def home(request):
    # You can pass data to template dynamically
    features = [
        {"icon": "🏔", "title": "Natural Wonders", "description": "From Netarhat to Hundru Falls..."},
        {"icon": "🎭", "title": "Rich Tribal Culture", "description": "Experience tribal traditions..."},
        {"icon": "🦌", "title": "Wildlife Adventure", "description": "Explore Betla National Park..."},
        {"icon": "🏛", "title": "Historical Heritage", "description": "Visit temples and historical sites..."},
    ]

    popular_destinations = [
        {"slug": "netarhat", "name": "Netarhat", "description": "The Queen of Chotanagpur...", "image_url": "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg"},
        {"slug": "hundru", "name": "Hundru Falls", "description": "Experience the thunderous waterfall...", "image_url": "https://images.pexels.com/photos/1029600/pexels-photo-1029600.jpeg"},
        {"slug": "betla", "name": "Betla National Park", "description": "Home to tigers, elephants...", "image_url": "https://images.pexels.com/photos/1029616/pexels-photo-1029616.jpeg"},
        {"slug": "deoghar", "name": "Deoghar", "description": "Sacred city with Baba Baidyanath Temple...", "image_url": "https://images.pexels.com/photos/1029615/pexels-photo-1029615.jpeg"},
    ]

    stats = [
        {"count": 50, "label": "Tourist Destinations"},
        {"count": 200, "label": "Local Partners"},
        {"count": 15, "label": "Tribal Communities"},
        {"count": 1000, "label": "Happy Visitors"},
    ]

    community_intro = "Our platform connects tourists with local artisans, guides, and service providers..."
    community_benefits = [
        "Direct booking with local homestays",
        "Authentic experiences with tribal guides",
        "Purchase traditional crafts directly from artisans",
        "Support eco-friendly tourism initiatives"
    ]

    context = {
        "features": features,
        "popular_destinations": popular_destinations,
        "stats": stats,
        "community_intro": community_intro,
        "community_benefits": community_benefits,
        "community_image_url": "https://images.pexels.com/photos/1029608/pexels-photo-1029608.jpeg",
    }
    return render(request, "home.html", context)

def destinations(request):
    destinations_data = [
        {
            "slug": "netarhat",
            "name": "Netarhat",
            "category": "nature",
            "main_image": "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
            "thumbnails": [
                "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
                "https://images.pexels.com/photos/1029602/pexels-photo-1029602.jpeg",
                "https://images.pexels.com/photos/1029603/pexels-photo-1029603.jpeg",
            ],
            "stars": "★★★★★",
            "rating": "4.8",
            "tagline": "The 'Queen of Chotanagpur'",
            "description": "Netarhat is a picturesque hill station known for its stunning sunrise and sunset views...",
            "highlights": [
                "Spectacular sunrise and sunset points",
                "Cool climate throughout the year",
                "Dense forests with diverse flora",
                "Netarhat Residential School",
                "Tribal villages nearby"
            ],
            "best_time": "October to March",
            "distance": "156 km"
        },
        {
            "slug": "hundru",
            "name": "Hundru Falls",
            "category": "nature adventure",
            "main_image": "https://images.pexels.com/photos/1029600/pexels-photo-1029600.jpeg",
            "thumbnails": [
                "https://images.pexels.com/photos/1029600/pexels-photo-1029600.jpeg",
                "https://images.pexels.com/photos/1029601/pexels-photo-1029601.jpeg",
                "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
            ],
            "stars": "★★★★☆",
            "rating": "4.6",
            "tagline": "Majestic 320-feet Waterfall",
            "description": "Hundru Falls is one of Jharkhand's most spectacular waterfalls, created by the Subarnarekha River...",
            "highlights": [
                "320 feet high waterfall",
                "Swimming pools at the base",
                "Rocky terrain perfect for trekking",
                "Photography opportunities",
                "Picnic spots"
            ],
            "best_time": "July to February",
            "distance": "45 km"
        },
        # You can add Betla, Deoghar, etc. the same way
    ]
    return render(request, "destinations.html", {"destinations": destinations_data})
    

def accommodations(request):
    featured_stays = [
        {
            "title": "Netarhat Homestay",
            "description": "Enjoy mountain views, home-cooked meals, and warm hospitality in the heart of Netarhat.",
            "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
        },
        {
            "title": "Ranchi Resort",
            "description": "Modern amenities, swimming pool, and easy access to city attractions and nature trails.",
            "image": "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
        },
        {
            "title": "Betla Eco Lodge",
            "description": "Stay amidst forests, spot wildlife, and support sustainable tourism near Betla National Park.",
            "image": "https://images.pexels.com/photos/21014/pexels-photo.jpg"
        },
        {
            "title": "Deoghar Guest House",
            "description": "Comfortable rooms, spiritual ambiance, and proximity to Baba Baidyanath Temple.",
            "image": "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"
        },
    ]

    return render(request, "accommodations.html", {
        "featured_stays": featured_stays
    })

def transportations(request):
    transport_services = [
        {
            "type": "cab",
            "name": "Private Cabs",
            "icon": "🚗",
            "description": "Comfortable AC cars with experienced local drivers",
            "features": ["❄ AC", "👨‍💼 Professional Driver", "🛡 Insured"],
            "price": "₹12-15/km",
            "button_text": "Book Cab"
        },
        {
            "type": "shared",
            "name": "Shared Vehicles",
            "icon": "🚐",
            "description": "Cost-effective shared rides for budget-conscious travelers",
            "features": ["💰 Economical", "👥 Shared Ride", "📅 Scheduled"],
            "price": "₹5-8/km",
            "button_text": "Book Shared"
        },
        {
            "type": "bike",
            "name": "Two-Wheeler Rental",
            "icon": "🏍",
            "description": "Explore at your own pace with bike and scooter rentals",
            "features": ["⛽ Fuel Efficient", "🔑 Self Drive", "🕐 Hourly/Daily"],
            "price": "₹300-800/day",
            "button_text": "Rent Bike"
        },
        {
            "type": "bus",
            "name": "Tourist Bus",
            "icon": "🚌",
            "description": "Group tours with air-conditioned buses and guide services",
            "features": ["🧑‍🏫 Guide Included", "❄ AC Bus", "👥 Group Tour"],
            "price": "₹500-1200/person",
            "button_text": "Book Tour"
        },
    ]
    return render(request, "transportations.html", {"transport_services": transport_services})

def contact(request):
    return render(request, "contact.html")

def subscribe(request):
    if request.method == "POST":
        email=request.POST.get("email")
        print(f"User subscribed with email: {email}")
        return render(request, "subscribe.html", {"message": "Thank you for subscribing!"})
    return render(request, "subscribe.html")

def culture(request):
    return render(request,"culture.html")

# AJAX endpoint for newsletter
@csrf_exempt
def subscribe_newsletter(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            if email:
                # Save email to database or send to external service here
                return JsonResponse({"success": True, "message": "Subscribed successfully!"})
            else:
                return JsonResponse({"success": False, "message": "Please enter a valid email."}, status=400)
        except:
            return JsonResponse({"success": False, "message": "Invalid data."}, status=400)
    return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)

def destination_detail(request, slug):
    # Find destination in your hardcoded list
    destinations_data = [
        {
            "slug": "netarhat",
            "name": "Netarhat",
            "category": "nature",
            "main_image": "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
            "thumbnails": [
                "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg",
                "https://images.pexels.com/photos/1029602/pexels-photo-1029602.jpeg",
                "https://images.pexels.com/photos/1029603/pexels-photo-1029603.jpeg",
            ],
            "stars": "★★★★★",
            "rating": "4.8",
            "tagline": "The 'Queen of Chotanagpur'",
            "description": "Netarhat is a picturesque hill station known for its stunning sunrise and sunset views...",
            "highlights": [
                "Spectacular sunrise and sunset points",
                "Cool climate throughout the year",
                "Dense forests with diverse flora",
                "Netarhat Residential School",
                "Tribal villages nearby"
            ],
            "best_time": "October to March",
            "distance": "156 km",
            "latitude": 23.4748,
            "longitude": 84.2688
        },
        {
            "slug": "hundru",
            "name": "Hundru Falls",
            "category": "nature adventure",
            "main_image": "https://images.pexels.com/photos/1029600/pexels-photo-1029600.jpeg",
            "thumbnails": [
                "https://images.pexels.com/photos/1029600/pexels-photo-1029600.jpeg",
                "https://images.pexels.com/photos/1029601/pexels-photo-1029601.jpeg",
                "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
            ],
            "stars": "★★★★☆",
            "rating": "4.6",
            "tagline": "Majestic 320-feet Waterfall",
            "description": "Hundru Falls is one of Jharkhand's most spectacular waterfalls, created by the Subarnarekha River...",
            "highlights": [
                "320 feet high waterfall",
                "Swimming pools at the base",
                "Rocky terrain perfect for trekking",
                "Photography opportunities",
                "Picnic spots"
            ],
            "best_time": "July to February",
            "distance": "45 km",
            "latitude": 23.2873,
            "longitude": 85.4664
        },
    ]

    destination = next((d for d in destinations_data if d["slug"] == slug), None)
    if not destination:
        return render(request, "404.html", status=404)

    map_embed_url = f"https://www.google.com/maps?q={destination['latitude']},{destination['longitude']}&hl=es;z=14&output=embed"

    return render(request, "destination_detail.html", {
        "destination": destination,
        "map_embed_url": map_embed_url
    })

def generate_mock_itinerary(data):
    """Simulates AI-generated itinerary based on user input"""
    return [
        {
            "day": 1,
            "destinations": "Ranchi, Hundru Falls",
            "activities": "Arrival in Ranchi, Visit Hundru Falls, Photography session, Local lunch",
            "transport": "Private cab from airport",
            "accommodation": "Hotel in Ranchi city center"
        },
        {
            "day": 2,
            "destinations": "Netarhat, Sunrise Point",
            "activities": "Early morning drive to Netarhat, Sunrise viewing, Hill station exploration, Local tribal village visit",
            "transport": "Private vehicle",
            "accommodation": "Netarhat hill resort"
        },
        {
            "day": 3,
            "destinations": "Betla National Park",
            "activities": "Wildlife safari, Bird watching, Nature walk, Return journey",
            "transport": "Safari jeep + return transport",
            "accommodation": "Forest guest house (optional)"
        }
    ]

def itinerary(request):
    form = ItineraryForm(request.POST or None)
    generated_itinerary = None

    if request.method == "POST" and form.is_valid():
        data = form.cleaned_data
        generated_itinerary = generate_mock_itinerary(data)

    return render(request, "itinerary.html", {
        "form": form,
        "generated_itinerary": generated_itinerary
    })

def login(request):
    if request.method=="GET":
        return render(request,"login.html",{"output":" "})
    #recieve data for login
    else:
        email=request.POST.get("email")
        password=request.POST.get("password")

        #to match user details in database
        userdetails=models.Register.objects.filter(email=email,password=password,status=1)

        if len(userdetails)>0:
            #print(userdetails[0].role)
            request.session["sunm"]=userdetails[0].email
            request.session["srole"]=userdetails[0].role

            if userdetails[0].role=="admin":
                return redirect("/myadmin/")
            else:
                return redirect("/user/")
        else:
            return render(request,"login.html",{"output":"Invalid user or verify your account....."})

def register(request):
    if request.method == "GET":
        return render(request, "register.html", {"output": ""})
    else:
        # Receive form data
        name = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        mobile = request.POST.get("mobile")
        address = request.POST.get("address")
        city = request.POST.get("city")
        gender = request.POST.get("gender")

        # Check if email already exists
        if models.Register.objects.filter(email=email).exists():
            return render(request, "register.html", {"output": "Email already registered.."})

        # Insert record into database
        p = models.Register(
            name=name,
            email=email,
            password=password,
            mobile=mobile,
            address=address,
            city=city,
            gender=gender,
            status=0,
            role="user",
            info=time.time()
        )
        p.save()

        # Removed emailAPI.sendMail(email, password)

        return render(request, "register.html", {"output": "User registered successfully..."})

    return render(request, "register.html")