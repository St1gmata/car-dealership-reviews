import requests
import json

DEALER_API = "http://localhost:3030/api/dealerships"
REVIEW_API = "http://localhost:3030/api/reviews"
SENTIMENT_API = "http://localhost:5050/analyze"

def get_request(url, params=None):
    response = requests.get(url, params=params)
    return response.json()

def post_request(url, payload):
    response = requests.post(url, json=payload)
    return response.json()

def get_dealers_from_cf(state="All"):
    if state == "All" or not state:
        return get_request(DEALER_API)
    return get_request(DEALER_API, params={"state": state})

def get_dealer_by_id(dealer_id):
    return get_request(DEALER_API, params={"id": dealer_id})

def get_dealer_reviews(dealer_id):
    return get_request(REVIEW_API, params={"dealership": dealer_id})

def post_review(review_data):
    return post_request(REVIEW_API, review_data)

def analyze_review_sentiments(text):
    response = requests.get(SENTIMENT_API, params={"text": text})
    return response.json()
