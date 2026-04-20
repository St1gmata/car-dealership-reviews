from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register_user, name='register'),
    path('login', views.login_user, name='login'),
    path('logout', views.logout_request, name='logout'),
    path('get_cars', views.get_cars, name='get_cars'),

    path('get_dealers', views.get_dealers, name='get_dealers'),
    path('get_dealers/<str:state>', views.get_dealers_by_state, name='get_dealers_by_state'),
    path('dealer/<int:dealer_id>', views.get_dealer_details, name='dealer_details'),
    path('add_review', views.add_review, name='add_review'),
    path('analyze_review', views.sentiment_analyzer, name='analyze_review'),
]
