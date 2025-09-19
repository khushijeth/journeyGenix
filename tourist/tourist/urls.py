"""
URL configuration for tourist project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .import views 



urlpatterns = [
    path('',views.home,name='home'),
    path('admin/',admin.site.urls,name='admin'),
    path('destinations/',views.destinations,name='destinations'),
    path('destinations/<slug:slug>/',views.destination_detail,name='destination_detail'),
    path('accommodations/',views.accommodations,name='accommodations'),
    path('transportations/',views.transportations,name='transportations'),
    path('culture/',views.culture,name='culture'),
    path('contact/',views.contact,name='contact'),
    path('login/', views.login,name='login'),
    path('register/', views.register,name='register'),
    path('subscribe/',views.subscribe,name='subscribe'),
    path('subscribe_newsletter/',views.subscribe_newsletter,name='subscribe_newsletter'),
    path('itinerary/',views.itinerary,name='itinerary'),
    path('booking/',views.booking,name='booking'),
    path('booking_results/',views.booking_results,name='booking_results'),
    path('search/', views.search, name='search'),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

