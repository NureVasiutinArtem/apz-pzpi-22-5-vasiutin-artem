/*public class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Animal(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public override string ToString()
    {
        return $"Тварина: {Name}, Вік: {Age}";
    }
}

public class Cat : Animal
{
    public string Breed { get; set; }

    public Cat(string imya, int vik, string breed)
        : base(imya, vik)
    {
        Breed = breed;
    }

    public override string ToString()
    {
        return $"Кіт: {Name}, Вік: {Age}, Порода: {Breed}";
    }
}

public class Pes : Animal
{
    public string Widht { get; set; }

    public Pes(string name, int age, string widht)
        : base(name, age)
    {
        Widht = widht;
    }

    public override string ToString()
    {
        return $"Пес: {Name}, Вік: {Age}, Розмір: {Widht}";
    }
}

public class Program
{
    static void Main()
    {
        Animal kit = new Cat("Мурчик", 2, "Сіамський");
        //Tvaryna pes = new Pes("Бровко", 4, "Великий");
        Animal kitClon = new Cat(kit.Name, kit.Age, kit.Breed);

        Console.WriteLine("Hi wolrld");
    }
}
*/


//Второй вариант


/*using System.Xml.Linq;

public class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Animal(string name, int age)
    {
        Name = name;
        Age = age;
    }
    public Animal(Animal other)
    {
        Name = other.Name;
        Age = other.Age;
    }
    public override string ToString()
    {
        return $"Тварина: {Name}, Вік: {Age}";
    }
}

public class Cat : Animal
{
    public string Breed { get; set; }

    public Cat(string imya, int vik, string breed)
        : base(imya, vik)
    {
        Breed = breed;
    }
    public Cat(Cat other) : base(other)
    {
        Breed = other.Breed;
    }

    public override string ToString()
    {
        return $"Кіт: {Name}, Вік: {Age}, Порода: {Breed}";
    }
}

public class Pes : Animal
{
    public string Widht { get; set; }

    public Pes(string name, int age, string widht)
        : base(name, age)
    {
        Widht = widht;
    }

    public override string ToString()
    {
        return $"Пес: {Name}, Вік: {Age}, Розмір: {Widht}";
    }
}

public class Program
{
    static void Main()
    {
        Animal kit = new Cat("Мурчик", 2, "Сіамський");
        Animal kitClon = new Cat((Cat)kit);

        Console.WriteLine("Hi wolrld");
    }
}
*/


//Треий вариант


using System.Xml.Linq;

abstract class Animal
{
    public abstract Animal Clone();
    public string Name { get; set; }
    public int Age { get; set; }

    public Animal(string name, int age)
    {
        Name = name;
        Age = age;
    }
    public Animal(Animal other)
    {
        Name = other.Name;
        Age = other.Age;
    }
    public override string ToString()
    {
        return $"Тварина: {Name}, Вiк: {Age}";
    }
}

class Cat : Animal
{
    public override Animal Clone()
    {
        return new Cat(this);
    }
    public string Breed { get; set; }

    public Cat(string imya, int vik, string breed)
        : base(imya, vik)
    {
        Breed = breed;
    }
    public Cat(Cat other) : base(other)
    {
        Breed = other.Breed;
    }

    public override string ToString()
    {
        return $"Кiт: {Name}, Вiк: {Age}, Порода: {Breed}";
    }
}
class Dog : Animal
{
    public override Animal Clone()
    {
        throw new NotImplementedException();
    }
    public string Widht { get; set; }


    public Dog(string name, int age, string widht)
        : base(name, age)
    {
        Widht = widht;
    }

    public override string ToString()
    {
        return $"Пес: {Name}, Вік: {Age}, Розмір: {Widht}";
    }
}

public class Program
{
    static void Main()
    {
        Animal cat = new Cat("Мурчик", 2, "Сiамський");
        Animal catClone = cat.Clone();
        Console.WriteLine(catClone.ToString());
    }
}

