
from decimal import Decimal
import math


a = float("nan")
print(f"a : {a}")

#Modulo Math
a = float("nan")
print(f"Es tipo NaN(Not a Number)? : {math.isnan(a)}")

#Modulo Decimal
a = Decimal("nan")
print(f"es de tipo NaN? : {math.isnan(a)}")