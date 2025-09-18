from django.db import models
from django.contrib.auth.models import User

class Subscriber(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)

    def __str__(self):
        return self.email
    
class NewsletterSubscriber(models.Model):
    email=models.EmailField(unique=True)

    def __str__(self):
        return self.email

class Itinerary(models.Model):
    duration = models.PositiveIntegerField()
    travelers = models.PositiveIntegerField()
    budget = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High')
    ])
    interests = models.TextField()  # Will store comma-separated interests
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Itinerary ({self.duration} days, {self.travelers} travelers)"


class ItineraryDay(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='days')
    day_number = models.PositiveIntegerField()
    destinations = models.TextField()
    activities = models.TextField()
    transport = models.CharField(max_length=255)
    accommodation = models.CharField(max_length=255)

    def _str_(self):
        return f"Day {self.day_number} - {self.itinerary}"
    
class tourist_register(models.Model):
    regid=models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    email=models.CharField(max_length=50,unique=True)
    password=models.CharField(max_length=50)

    def __str__(self):
        return self.name
    

# Destination model
class Destination(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)

    def _str_(self):
        return f"{self.name}, {self.city}"


# Service model (Hotel, Bus, Train, Tour)
class Service(models.Model):
    SERVICE_CHOICES = [
        ('hotel', 'Hotel'),
        ('bus', 'Bus'),
        ('train', 'Train'),
        ('tour', 'Tour'),
    ]
    service_type = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    name = models.CharField(max_length=100)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    price_per_person = models.DecimalField(max_digits=10, decimal_places=2)
    available_slots = models.PositiveIntegerField(default=0)

    def _str_(self):
        return f"{self.name} ({self.get_service_type_display()})"


# Booking model
class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    travel_date = models.DateField()
    people_count = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    booked_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Calculate total price automatically
        self.total_price = self.people_count * self.service.price_per_person
        super().save(*args, **kwargs)

    def _str_(self):
        return f"{self.user.username} - {self.service.name} ({self.status})"
    