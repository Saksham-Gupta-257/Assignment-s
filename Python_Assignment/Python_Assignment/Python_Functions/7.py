def tower_of_hanoi(n: int, source: str, target: str, auxiliary: str) -> None:
    if n <= 0:
        raise ValueError("Number of disks must be a positive integer.")
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
    else:
        tower_of_hanoi(n - 1, source, auxiliary, target)  
        print(f"Move disk {n} from {source} to {target}")  
        tower_of_hanoi(n - 1, auxiliary, target, source)   

num_disks = 3
print(f"Solving Tower of Hanoi with {num_disks} disks:")
tower_of_hanoi(num_disks, "A", "C", "B")