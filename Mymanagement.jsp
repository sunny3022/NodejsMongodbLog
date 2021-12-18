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
<body>
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
	
	
	
	<div class="container">
		<!-- 内容  -->
		<div class="row" style="margin-top: 10px">
			<div class="col-lg-3">
				<ul class="list-group">
					<a href="Mymanagement.jsp" class="list-group-item list-group-item-action" active>发表文章</a>
					<a href="AllauthorServlet" class="list-group-item list-group-item-action" active>用户文章</a>
					<a href="MyAllArticleServlet" class="list-group-item list-group-item-action">修改/删除文章</a>
					<a href="MyAllReviewServlet" class="list-group-item list-group-item-action">修改/删除评论</a>
					<a href="MyInfo" class="list-group-item list-group-item-action">我的信息</a>
				
					<a href="login_out" class="list-group-item list-group-item-action">登出</a>
				</ul>
				<div class="card">
					<ul class="list-group list-group-flush">
						<li class="list-group-item">学号：190110910804</li>
						<li class="list-group-item">班级：19计算机2班</li>
						<li class="list-group-item">姓名：陈蒙蒙</li>
					</ul>
				</div>			
			</div>
			<div class="col-lg-9">
				<form action="PublishServlet" method="post"
					>
						<h1 class="h3 mb-3 font-weight-normal">发表文章</h1>
						<p>${info}</p>
					<div class="row">
						
						<label for="inputEmail3" class="col-sm-2 col-form-label">题目</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="inputEmail3"
								name="title" placeholder="请输入题目..." 
								>
						</div>
					</div>
					<fieldset class="form-group">
						<div class="row">
							<legend class="col-form-label col-sm-2 pt-0">性质</legend>
							<div class="col-sm-10">
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="property"
										id="property1" value="原创" checked=""> <label
										class="form-check-label" for="inlineRadio1">原创</label>
								</div>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="property"
										id="property2" value="摘抄"> <label
										class="form-check-label" for="inlineRadio2">摘抄</label>
								</div>
							</div>
						</div>
					</fieldset>
					<div class="form-group row">
						<label for="inputEmail3" class="col-sm-2 col-form-label">内容</label>
						<div class="col-sm-10">
						        <textarea cols="100%" rows="20" placeholder="请输入文章内容..." name="content" ></textarea>
						</div>
					</div>
			
					<div class="col-sm-10" align="center">
							<button type="submit" class="btn btn-primary">发表</button>
					</div>
						
				</form>
			</div>


		</div>

	</div>
	
	
</body>
</html>