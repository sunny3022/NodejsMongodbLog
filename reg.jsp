<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>星空</title>
	
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" >
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" ></script>
	<script src="https://code.jquery.com/jquery.min.js" ></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" ></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" ></script>
</head>
<body   background="photo/bg.jpg" style=" background-repeat:no-repeat ;background-size:100% 100%;
background-attachment: fixed;">
	<nav class="navbar navbar-expand-lg navbar-light bg-light" >
		<!-- Just an image -->
		<img src="photo/mm.jpg" width="30" height="30" alt=""> 
		<button class="navbar-toggler" type="button" data-toggle="collapse"
			data-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent" aria-expanded="false"
			aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
	
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
			
				<li class="nav-item active"><a class="nav-link" href="AllArticleServlet">首页</a></li>
				<li class="nav-item"><a class="nav-link" href="MyArticleServlet">我的帖子</a></li>
				
				<li class="nav-item"><a class="nav-link " href="Mymanagement.jsp">我的管理</a></li>
				
					
				<li class="nav-item"><a class="nav-link " href="login.jsp">点我登录</a></li>
				<li class="nav-item dropdown"><a
					class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
					role="button" data-toggle="dropdown" aria-haspopup="true"
					aria-expanded="false"> ${username==null?'未登录':username}</a>
					
					
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="MyInfo">我的信息</a> <a
							class="dropdown-item" href="editPwd.jsp">修改密码</a>
						<div class="dropdown-divider"></div>
						<a class="dropdown-item" href="login_out">注销</a>
					</div>
				
					
				</li>
				</li>
			</ul>
			
		</div>
	</nav>
	<div class="container" >
		<!-- 内容  -->
		<div class="row" style="margin-top: 150px" >
		
			<div class="col-sm-6" style="margin-left: 800px">
				<form action="RegAction" method="post" action="RegAction"
					enctype="multipart/form-data">
							<h1 class="h3 mb-3 font-weight-normal">注册信息</h1>
					<div class="form-group row">
						<label for="inputEmail3" class="col-sm-2 col-form-label">用户名</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="inputEmail3"
								name="username" placeholder="请输入账号..." 
								>
						</div>
					</div>
					<div class="form-group row">
						<label for="inputPassword3" class="col-sm-2 col-form-label">密码</label>
						<div class="col-sm-10">
							<input type="password" class="form-control" id="inputPassword3"
								name="password" placeholder="请输入密码...">
						</div>
					</div>
					<fieldset class="form-group">
						<div class="row">
							<legend class="col-form-label col-sm-2 pt-0">性别</legend>
							<div class="col-sm-10">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="sex"
										id="sex1" value="boy" checked=""> <label
										class="form-check-label" for="inlineRadio1">男</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="sex"
										id="sex2" value="girl"> <label
										class="form-check-label" for="inlineRadio2">女</label>
								</div>
							</div>
						</div>
					</fieldset>
					<div class="form-group row">
						<label for="inputPassword3" class="col-sm-2 col-form-label">生日</label>
						<div class="col-sm-10">
							<input type="date" name="birth" class="form-control"
								id="inputPassword3" placeholder="生日" value="1980-01-01">
						</div>
					</div>

					<div class="form-group row">
						<label for="inputPassword3" class="col-sm-2 col-form-label">专业</label>
						<div class="col-sm-10">
							<select class="form-control" name="major">
								<option value="Electronic Commerce">电子商务</option>
								<option value="Computer science and technology">计算机</option>
								<option value="software engineering">软件工程</option>
								<option value="information management">信息管理</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="inputPassword3" class="col-sm-2 col-form-label">特长</label>
						<div class="col-sm-10">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="checkbox" name="talent"
									id="inlineCheckbox1" value="java"> <label
									class="form-check-label" for="inlineCheckbox1">java</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="checkbox" name="talent"
									id="inlineCheckbox2" value="c++"> <label
									class="form-check-label" for="inlineCheckbox2">c++</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="checkbox" name="talent"
									id="inlineCheckbox3" value="python"> <label
									class="form-check-label" for="inlineCheckbox3">python</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="checkbox" name="talent"
									id="inlineCheckbox4" value="pascal"> <label
									class="form-check-label" for="inlineCheckbox4">pascal</label>
							</div>
						</div>
						<div class="form-group row">
							<label for="inputPassword3" class="col-sm-5 col-form-label">个人照片</label>
							<div class="col-sm-7">
								<input type="file" class="form-control-file"
									id="exampleFormControlFile1" name="photo">
							</div>
						</div>
						<div class="col-sm-10">
							<button type="submit" class="btn btn-primary">注册</button>
							<button class="btn btn-primary" href="login.jsp">返回</button>
						</div>
						
				</form>
			</div>


		</div>

	</div>


</body>
</html>