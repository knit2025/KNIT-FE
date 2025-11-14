import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";
import { getPostDetail } from '../../lib/api/post';

interface PostDetail {
  postId: number;
  userId: number;
  username: string;
  nickname: string;
  text: string;
  image: string;
  date: string;
  createdAt: string;
}

const PhotoDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) return;
      
      try {
        setLoading(true);
        const data = await getPostDetail(Number(postId));
        console.log('게시물 상세:', data);
        setPost(data);
      } catch (err) {
        console.error('게시물 불러오기 실패:', err);
        setError('게시물을 불러올 수 없습니다.');
        } finally { 
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  const handleBack = () => {
    navigate('/MissionLog');
  };

  if (loading) {
    return (
      <div className="min-h-screen relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden flex flex-col items-center justify-center">
        <div className="text-[#3A290D]">로딩 중...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden flex flex-col items-center justify-center">
        <div className="text-red-600 mb-4">{error || '게시물을 찾을 수 없습니다.'}</div>
        <button 
          onClick={handleBack}
          className="px-6 py-2 bg-[#523E1B] text-white rounded-lg"
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (

    <div className='min-h-screen relative mx-auto w-[390px] bg-white'>
      <img src={KNITLG} alt="KNITLG" className='pt-[43px] pl-[33px] w-[100px]'/>
      <div className='pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]'>우리가족의 소중한 추억</div>
        <div className='pr-[23px] pl-[23px] mb-7'>
          <div className='w-[342px] h-[337px] bg-[#E7E7E7] rounded-2xl text-black flex justify-center items-center overflow-hidden'>         {post.image ? (
            <img 
              src={`https://junhong.shop${post.image}`}
              alt="게시물 사진"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[#A9927F]">사진 없음</span>
          )}
        </div>
      </div>
      <div className="h-full rounded-t-[35px] text-left bg-[#F2E7DF]">
        <div className="flex justify-center pt-[15px]">
          <div className="bg-[#DEB99F] w-[39px] h-[6px] rounded-2xl"></div>
        </div>
        <div className='text-[#3A290D] font-bold pt-[28px] ml-[23px] mr-[23px]'> {post.date}</div>
        <div className='ml-[23px] mr-[23px]'>
          <div>
          <div className='text-[13px] text-[#3A290D] font-gabia mb-2 mt-5'>{post.nickname}</div>
                    <div className='text-black text-[11px] font-gabia w-70'> {post.text}</div>
        </div>
        </div>
      </div>
      {/* </div> */}
      <div className="bottom-0 left-0 w-full z-40">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PhotoDetail;
