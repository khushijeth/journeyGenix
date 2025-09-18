from django.db import models

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
    
class Register(models.Model):
    name=models.CharField(max_length=50)
    email=models.CharField(max_length=50,unique=True)
    password=models.CharField(max_length=50)
    mobile=models.CharField(max_length=50)
    address=models.CharField(max_length=500)
    city=models.CharField(max_length=20)
    status=models.IntegerField()
    role=models.CharField(max_length=10)
    info=models.CharField(max_length=50)

    def __str__(self):
        return self.name