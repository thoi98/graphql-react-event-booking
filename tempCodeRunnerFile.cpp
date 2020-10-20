#include<iostream>
 
using namespace std;
 
 
void solve(int n)
{
    int x=n%2;
    if(x)
        cout<<7;
    for(int i=n/2-x;i>0;--i)
        cout<<1;
    cout<<endl;
}

int main()
{
    int tc;
    cin>>tc;
    for(int i=0;i<tc;++i)
    {
        int n;
        cin>>n;
        solve(n);
    }
}
