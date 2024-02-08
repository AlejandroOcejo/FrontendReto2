export function openNav(): void {
    const mySidenav: HTMLElement | null = document.getElementById("mySidenav");
    if (mySidenav !== null) {
        mySidenav.style.width = "250px";
    }
}

export function closeNav(): void {
    const mySidenav: HTMLElement | null = document.getElementById("mySidenav");
    if (mySidenav !== null) {
        mySidenav.style.width = "0";
    }
}

export function logout(): void {

}