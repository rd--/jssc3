bool(true)
bool(false)
bool(false).not() // bool(true)
bool(false).or(bool(true)) // bool(true)
bool(false).and(bool(true)) // bool(false)
bool(true).equalTo(bool(true)) // bool(true)
bool(true).equalTo(bool(false)) // bool(false)
bool(true).equalTo(int(0)) // bool(false)

int(1)
int(1).add(int(1))
int(1).asFloat()
int(1).asInt()
int(1).asString()
int(1).isInt() // bool(true);
int(1).negated()
int(1).to(int(9))
int(1).equalTo(int(1)) // bool(true)
int(1).equalTo(int(2)) // bool(false)
int(1).equalTo(float(1)) // bool(true)
int(1).equalTo(float(2)) // bool(false)
int(1).equalTo(sym('x')) // bool(false)
int(9).rand()
int(3).rand(int(7))
int(9).rand2()

x = int(1).to(int(3));
y = int(4).to(int(6));
z = int(7).to(int(9));
x.append(y)
x.at(int(2))
x.atWrap(int(5))
int(1).to(int(9)).negated()

float(1).isFloat() // bool(true)
Float.pi() // ~= float(3.13159)
float(2).rand()
float(2).rand(float(3))
float(3).rand2()
float(3.14159).sin().negated() // ~float(-0)
float(1).equalTo(float(1)) // bool(true)
float(1).equalTo(int(1)) // bool(true)
float(1).equalTo(int(2)) // bool(false)
float(1).equalTo(sym('x')) // bool(false)

int(1).add(int(2)) // int(3)
int(1).add(float(2.3)) // float(3.3)
float(1.2).add(float(3.4)) // float(4.6)
float(1.2).add(int(3)) // float(4.2)

int(1).mul(int(2)) // int(2)
int(1).mul(float(2.3)) // float(2.3)
float(1.2).mul(float(3.4)) // float(4.08)
float(1.2).mul(int(3)) // float(3.6)

int(2).pow(int(3)) // int(8)
int(2).pow(float(3.4)) // ~float(10.556)
float(1.2).pow(float(3.4)) // ~float(1.859)
float(1.2).pow(int(3)) // float(1.728)

str('x')
str('x').asSymbol()
str('x').asString()
str('x').isString()
str('x').size() // int(1)
str('x').isEmpty() // bool(false)
str('').isEmpty() // bool(true)
str('x').equalTo(str('x')) // bool(true)
str('x').equalTo(sym('x')) // bool(false)
str('x').equalTo(str('y')) // bool(false)

sym('x').equalTo(sym('x')) // bool(true)
sym('x').equalTo(str('x')) // bool(false)
sym('x').equalTo(sym('y')) // bool(false)

vector([]).isEmpty() // bool(true)

int(1).to(int(4)).add(int(5)) // [6, 7, 8, 9]
int(1).to(int(4)).add(float(5.6)) // [6.6, 7.6, 8.6, 9.6]
int(1).add(int(4).to(int(7))) // [5, 6, 7, 8]
float(1.2).add(int(4).to(int(7))) // [5.2, 6.2, 7.2, 8.2]
int(1).to(int(4)).add(int(5).to(int(8))) // [6, 8, 10, 12]

block(() => int(9).rand()).dup()
block(() => float(3).rand()).dup(9)
