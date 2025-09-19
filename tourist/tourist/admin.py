from django.contrib import admin
from .models import Subscriber, NewsletterSubscriber, Itinerary, ItineraryDay, tourist_register, Destination, Booking  

admin.site.register(Subscriber)
admin.site.register(NewsletterSubscriber)
admin.site.register(Itinerary)
admin.site.register(ItineraryDay)
admin.site.register(tourist_register)
admin.site.register(Destination)
admin.site.register(Booking)
