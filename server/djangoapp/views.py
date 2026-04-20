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
