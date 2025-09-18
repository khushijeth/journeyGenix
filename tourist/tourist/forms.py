from django import forms
from .models import Booking 

INTEREST_OPTIONS = [
    'Nature & Wildlife',
    'Cultural Heritage',
    'Adventure Sports',
    'Spiritual Tourism',
    'Photography',
    'Tribal Culture',
    'Waterfalls',
    'Hill Stations',
    'Handicrafts',
    'Local Cuisine'
]

class ItineraryForm(forms.Form):
    duration = forms.IntegerField(min_value=1, max_value=7, label="Trip Duration")
    travelers = forms.IntegerField(min_value=1, max_value=20, label="Number of Travelers")
    budget = forms.ChoiceField(choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')])
    interests = forms.MultipleChoiceField(
        choices=[(i, i) for i in INTEREST_OPTIONS],
        widget=forms.CheckboxSelectMultiple,
        required=False
    )


class BookingForm(forms.Form):
    class Meta:
        model = Booking
        fields = ['name', 'service', 'destination', 'checkin', 'checkout', 'people_count']

        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Your Name',
                'class': 'form-control',
                'required': True
            }),
            'service': forms.Select(attrs={
                'class': 'form-control',
                'required': True
            }),
            'destination': forms.TextInput(attrs={
                'placeholder': 'Enter city or place',
                'class': 'form-control',
                'required': True
            }),
            'checkin': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control',
                'required': True
            }),
            'checkout': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control',
                'required': True
            }),
            'people_count': forms.NumberInput(attrs={
                'min': 1,
                'value': 1,
                'class': 'form-control',
                'required': True
            }),
        }
