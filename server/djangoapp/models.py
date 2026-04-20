from django.db import models

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE, related_name='models')
    name = models.CharField(max_length=100)
    dealer_id = models.IntegerField(null=True, blank=True)
    type = models.CharField(max_length=50, blank=True)
    year = models.IntegerField(default=2020)

    def __str__(self):
        return f"{self.car_make.name} {self.name}"
