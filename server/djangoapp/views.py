import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({"success": False, "message": "Username already exists"}, status=400)

        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        return JsonResponse({"success": True, "message": "User created successfully"}, status=201)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({
                "username": user.username,
                "status": "Authenticated"
            })
        return JsonResponse({"status": "Failed", "message": "Invalid credentials"}, status=401)

def logout_request(request):
    logout(request)
    return JsonResponse({"status": "Logged out"})

def get_cars(request):
    makes = []
    for make in CarMake.objects.all():
        models = CarModel.objects.filter(car_make=make)
        makes.append({
            "id": make.id,
            "name": make.name,
            "models": [
                {
                    "id": model.id,
                    "name": model.name,
                    "year": model.year,
                    "type": model.type,
                    "dealer_id": model.dealer_id
                } for model in models
            ]
        })
    return JsonResponse({"CarModels": makes})
from .restapis import (
    get_dealers_from_cf,
    get_dealer_by_id,
    get_dealer_reviews,
    post_review,
    analyze_review_sentiments
)
from django.contrib.auth.decorators import login_required
from django.utils.timezone import now

def get_dealers(request):
    state = request.GET.get('state')
    dealers = get_dealers_from_cf(state)
    return JsonResponse({"status": 200, "dealers": dealers}, safe=False)

def get_dealer_details(request, dealer_id):
    dealer = get_dealer_by_id(dealer_id)
    reviews = get_dealer_reviews(dealer_id)
    return JsonResponse({
        "dealer": dealer,
        "reviews": reviews
    }, safe=False)

def get_dealers_by_state(request, state):
    dealers = get_dealers_from_cf(state)
    return JsonResponse({"status": 200, "dealers": dealers}, safe=False)

def sentiment_analyzer(request):
    text = request.GET.get("text", "")
    result = analyze_review_sentiments(text)
    return JsonResponse(result)

@login_required
@csrf_exempt
def add_review(request):
    if request.method == "POST":
        data = json.loads(request.body)
        payload = {
            "user_id": request.user.id,
            "name": f"{request.user.first_name} {request.user.last_name}".strip() or request.user.username,
            "dealership": data.get("dealership"),
            "review": data.get("review"),
            "time": str(now()),
            "purchase": data.get("purchase"),
            "purchase_date": data.get("purchase_date"),
            "car_make": data.get("car_make"),
            "car_model": data.get("car_model"),
            "car_year": data.get("car_year"),
        }
        response = post_review(payload)
        return JsonResponse(response, safe=False)
