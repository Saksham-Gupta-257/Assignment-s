def tower_of_hanoi(n, src, aux, target):
    if n == 1:
        print(f"Move disk 1 from {src} to {target}")
    else:
        tower_of_hanoi(n - 1, src, target, aux)
        print(f"Move disk {n} from {src} to {target}")
        tower_of_hanoi(n - 1, aux, src, target)

print("Enter the number of disks:")
num_disks = int(input())

print("Steps to solve Tower of Hanoi:")
tower_of_hanoi(num_disks, 'A', 'B', 'C')
