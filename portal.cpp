#include <iostream>
#include <string>
using namespace std;

// Simple assignment structure
struct Assignment {
    int id;
    string student;
    string subject;
    string title;
    string status;
};

// Display menu
void showMenu() {
    cout << "\nStudent Portal System\n";
    cout << "1. Submit Assignment\n";
    cout << "2. View Assignments\n";
    cout << "3. Exit\n";
    cout << "Choose: ";
}

int main() {
    Assignment list[50];
    int count = 0;
    int choice;
    
    cout << "🎓 Welcome to Student Portal!\n";
    
    do {
        showMenu();
        cin >> choice;
        cin.ignore();
        
        switch(choice) {
            case 1: {
                cout << "\nNew Assignment\n";
                cout << "Subject: ";
                string subject; getline(cin, subject);
                
                cout << "Title: ";
                string title; getline(cin, title);
                
                cout << "Student: ";
                string student; getline(cin, student);
                
                list[count].id = count + 1;
                list[count].subject = subject;
                list[count].title = title;
                list[count].student = student;
                list[count].status = "Submitted";
                
                count++;
                cout << "Submitted!\n";
                break;
            }
                
            case 2: {
                cout << "\nAll Assignments:\n";
                if(count == 0) {
                    cout << "No assignments yet.\n";
                } else {
                    for(int i = 0; i < count; i++) {
                        cout << "\n#" << list[i].id << " - " << list[i].subject << endl;
                        cout << "Title: " << list[i].title << endl;
                        cout << "Student: " << list[i].student << endl;
                        cout << "Status: " << list[i].status << endl;
                    }
                }
                break;
            }
                
            case 3:
                cout << "\nGoodbye!\n";
                break;
                
            default:
                cout << "Invalid choice!\n";
        }
        
    } while(choice != 3);
    
    return 0;
}