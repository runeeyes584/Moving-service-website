# 🔐 Authentication System - EazeMove

## 📋 Tổng quan

Hệ thống đăng nhập tạm thời cho website EazeMove với hai role chính: **User** và **Admin**. Hệ thống sử dụng localStorage để lưu trữ dữ liệu tạm thời và không cần backend.

## 🎯 Tính năng chính

### ✅ **Authentication Pages**
- **Login Page** (`pages/login.html`) - Trang đăng nhập
- **Register Page** (`pages/register.html`) - Trang đăng ký
- **Forgot Password** (`pages/forgot-password.html`) - Trang quên mật khẩu

### ✅ **Dashboard Pages**
- **Admin Dashboard** (`pages/admin-dashboard.html`) - Dashboard quản trị
- **User Profile** (`pages/user-profile.html`) - Trang profile người dùng

### ✅ **Role-based Access**
- **Admin Role**: Truy cập dashboard quản trị với thống kê và quản lý
- **User Role**: Truy cập profile cá nhân và quản lý thông tin

## 🔑 Demo Accounts

### Admin Account
- **Email**: admin@eazemove.com
- **Password**: admin123
- **Access**: Admin Dashboard với đầy đủ quyền quản trị

### User Account
- **Email**: user@eazemove.com
- **Password**: user123
- **Access**: User Profile với quản lý thông tin cá nhân

## 📁 Cấu trúc Files

```
assets/
├── css/
│   ├── auth.css          # Styles cho authentication pages
│   └── dashboard.css     # Styles cho dashboard pages
├── js/
│   ├── auth.js           # Xử lý authentication logic
│   ├── admin-dashboard.js # Logic cho admin dashboard
│   └── user-profile.js   # Logic cho user profile
pages/
├── login.html            # Trang đăng nhập
├── register.html         # Trang đăng ký
├── forgot-password.html  # Trang quên mật khẩu
├── admin-dashboard.html  # Dashboard admin
└── user-profile.html     # Profile user
```

## 🚀 Cách sử dụng

### 1. **Đăng nhập**
1. Truy cập `pages/login.html`
2. Sử dụng demo accounts hoặc đăng ký tài khoản mới
3. Hệ thống sẽ tự động redirect đến dashboard phù hợp

### 2. **Admin Dashboard**
- Xem thống kê tổng quan (bookings, revenue, customers)
- Biểu đồ doanh thu và trạng thái booking
- Danh sách bookings và customers gần đây
- Quick actions để quản lý

### 3. **User Profile**
- Quản lý thông tin cá nhân
- Cập nhật địa chỉ và preferences
- Xem lịch sử hoạt động
- Thống kê cá nhân (bookings, chi tiêu)

## 🛠️ Technical Features

### **Authentication System**
- Session management với localStorage/sessionStorage
- Password strength validation
- Form validation với real-time feedback
- Remember me functionality
- Auto-logout protection

### **Admin Dashboard**
- Interactive charts (Chart.js)
- Real-time statistics animation
- Responsive design
- Mock data integration

### **User Profile**
- Editable form fields
- Avatar management
- Activity tracking
- Preference settings

## 🎨 UI/UX Features

### **Design Elements**
- Modern, clean interface
- Consistent color scheme (#4CAF50)
- Responsive design cho mọi thiết bị
- Smooth animations và transitions
- Professional typography

### **User Experience**
- Intuitive navigation
- Clear visual feedback
- Error handling với notifications
- Loading states
- Form validation

## 📱 Responsive Design

- **Desktop**: Full layout với sidebar và main content
- **Tablet**: Adaptive grid layout
- **Mobile**: Stack layout với mobile-optimized navigation

## 🔒 Security Features

- Client-side validation
- Password strength requirements
- Session timeout protection
- Role-based access control
- Input sanitization

## 🚀 Future Enhancements

### **Planned Features**
- Email verification system
- Password reset via email
- Two-factor authentication
- Advanced admin analytics
- User activity logs
- File upload for avatars

### **Backend Integration**
- API endpoints cho authentication
- Database integration
- Real-time notifications
- Advanced security measures

## 📊 Mock Data Structure

### **User Data**
```javascript
{
  id: Number,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  role: 'admin' | 'user',
  phone: String,
  dateOfBirth: String,
  address: Object,
  preferences: Object,
  stats: Object
}
```

### **Booking Data**
```javascript
{
  id: Number,
  customerName: String,
  service: String,
  date: String,
  status: String,
  amount: Number,
  addresses: Object
}
```

## 🎯 Usage Examples

### **Login Flow**
```javascript
// User login
const user = authenticateUser(email, password);
if (user.role === 'admin') {
  redirectToAdminDashboard();
} else {
  redirectToUserProfile();
}
```

### **Session Management**
```javascript
// Check authentication
const currentUser = getCurrentUser();
if (!currentUser) {
  redirectToLogin();
}

// Update user data
updateUserData(updatedData);
```

## 📞 Support

Để được hỗ trợ về hệ thống authentication:
- **Email**: support@eazemove.com
- **Phone**: +1 (555) 987-6543
- **Documentation**: Xem README.md chính

---

**EazeMove Authentication System** - Secure, user-friendly, and ready for production! 🔐✨
