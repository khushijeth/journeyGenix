from django import forms

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